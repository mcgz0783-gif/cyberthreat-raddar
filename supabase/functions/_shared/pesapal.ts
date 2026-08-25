// Central Pesapal environment resolution.
// Sandbox and live credentials are stored in SEPARATE secrets so a sandbox test
// can never accidentally hit live keys. PESAPAL_ENVIRONMENT is the single switch.

export type PesapalEnv = "live" | "sandbox";

export function pesapalEnv(): PesapalEnv {
  const raw = (Deno.env.get("PESAPAL_ENVIRONMENT") || "sandbox").trim().toLowerCase();
  return raw === "live" || raw === "production" ? "live" : "sandbox";
}

export function pesapalBaseUrl(env: PesapalEnv = pesapalEnv()) {
  return env === "live"
    ? "https://pay.pesapal.com/v3/api"
    : "https://cybqa.pesapal.com/pesapalv3/api";
}

/** Environment-scoped secret with a fallback to the legacy shared name. */
function scoped(name: string, env: PesapalEnv) {
  const prefixed = Deno.env.get(`PESAPAL_${env.toUpperCase()}_${name}`)?.trim();
  if (prefixed) return prefixed;
  return Deno.env.get(`PESAPAL_${name}`)?.trim() || "";
}

export function pesapalCredentials(env: PesapalEnv = pesapalEnv()) {
  return {
    env,
    baseUrl: pesapalBaseUrl(env),
    consumerKey: scoped("CONSUMER_KEY", env),
    consumerSecret: scoped("CONSUMER_SECRET", env),
    ipnId: scoped("IPN_ID", env),
    usingScopedSecrets: Boolean(Deno.env.get(`PESAPAL_${env.toUpperCase()}_CONSUMER_KEY`)),
  };
}

export async function getPesapalToken(env: PesapalEnv = pesapalEnv()): Promise<string> {
  const c = pesapalCredentials(env);
  if (!c.consumerKey || !c.consumerSecret) {
    throw new Error(`Pesapal ${env} credentials are not configured`);
  }
  const r = await fetch(`${c.baseUrl}/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: c.consumerKey, consumer_secret: c.consumerSecret }),
  });
  const j = await r.json();
  if (!j?.token) throw new Error(`Pesapal ${env} auth failed: ${JSON.stringify(j)}`);
  return j.token as string;
}

export async function getTransactionStatus(trackingId: string, env: PesapalEnv = pesapalEnv()) {
  const token = await getPesapalToken(env);
  const r = await fetch(
    `${pesapalBaseUrl(env)}/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(trackingId)}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } },
  );
  return await r.json();
}
