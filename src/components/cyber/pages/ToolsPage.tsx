import { useState } from "react";
import { SectionHeader } from "../Misc";

// ── Helpers ──────────────────────────────────────────────────────────────────
async function sha256(text: string) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}
async function sha1(text: string) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ── CVE Search ───────────────────────────────────────────────────────────────
function CVESearch() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [err, setErr] = useState("");

  const search = async () => {
    if (!q.trim()) return;
    setLoading(true); setErr(""); setResults([]);
    try {
      const isCve = /^CVE-\d{4}-\d{4,}$/i.test(q.trim());
      const url = isCve
        ? `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${encodeURIComponent(q.trim().toUpperCase())}`
        : `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(q)}&resultsPerPage=10`;
      const r = await fetch(url);
      if (!r.ok) throw new Error(`NVD ${r.status}`);
      const data = await r.json();
      setResults(data.vulnerabilities || []);
    } catch (e: any) {
      setErr(e.message || "Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-cyber p-6">
      <h3 className="font-display font-bold text-white text-lg mb-1">🔍 CVE / Vulnerability Search</h3>
      <p className="text-xs text-muted-foreground mb-4 font-mono">Powered by NIST National Vulnerability Database</p>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          className="input-cyber flex-1"
          placeholder="CVE-2024-3094 or keyword (e.g. openssh)"
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
        />
        <button onClick={search} disabled={loading} className="btn-cyber whitespace-nowrap">
          {loading ? "Searching…" : "▸ SEARCH"}
        </button>
      </div>
      {err && <p className="text-danger text-sm font-mono">{err}</p>}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {results.map((v: any) => {
          const c = v.cve;
          const desc = c.descriptions?.find((d: any) => d.lang === "en")?.value || "";
          const metric = c.metrics?.cvssMetricV31?.[0]?.cvssData || c.metrics?.cvssMetricV30?.[0]?.cvssData;
          return (
            <div key={c.id} className="border border-border p-3 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <a href={`https://nvd.nist.gov/vuln/detail/${c.id}`} target="_blank" rel="noopener noreferrer" className="font-mono text-primary text-sm font-bold">{c.id}</a>
                {metric && <span className="font-mono text-xs px-2 py-0.5 bg-danger/15 border border-danger/40 text-danger">CVSS {metric.baseScore} · {metric.baseSeverity}</span>}
              </div>
              <p className="text-sm text-foreground/80 line-clamp-3">{desc}</p>
            </div>
          );
        })}
        {!loading && !err && results.length === 0 && <p className="text-xs text-muted-foreground">No results yet. Try "CVE-2024-3094" or "kubernetes".</p>}
      </div>
    </div>
  );
}

// ── Hash Checker ─────────────────────────────────────────────────────────────
function HashChecker() {
  const [text, setText] = useState("");
  const [out, setOut] = useState<{ sha1: string; sha256: string } | null>(null);
  const [fileInfo, setFileInfo] = useState("");

  const compute = async () => {
    if (!text) return;
    setOut({ sha1: await sha1(text), sha256: await sha256(text) });
  };
  const onFile = async (f: File) => {
    setFileInfo(`${f.name} · ${(f.size / 1024).toFixed(1)} KB`);
    const buf = await f.arrayBuffer();
    const h1 = await crypto.subtle.digest("SHA-1", buf);
    const h256 = await crypto.subtle.digest("SHA-256", buf);
    const hex = (b: ArrayBuffer) => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, "0")).join("");
    setOut({ sha1: hex(h1), sha256: hex(h256) });
  };

  return (
    <div className="card-cyber p-6">
      <h3 className="font-display font-bold text-white text-lg mb-1">#️⃣ Hash Checker</h3>
      <p className="text-xs text-muted-foreground mb-4 font-mono">Compute SHA-1 / SHA-256 entirely in your browser. Nothing uploaded.</p>
      <textarea className="input-cyber mb-2" rows={3} placeholder="Paste text..." value={text} onChange={e => setText(e.target.value)} />
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button onClick={compute} className="btn-cyber">▸ HASH TEXT</button>
        <label className="btn-ghost-cyber cursor-pointer">
          📁 HASH FILE
          <input type="file" className="hidden" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
        </label>
        {fileInfo && <span className="font-mono text-xs text-muted-foreground">{fileInfo}</span>}
      </div>
      {out && (
        <div className="space-y-2 font-mono text-xs break-all">
          <div><span className="text-primary">SHA-1:  </span>{out.sha1}</div>
          <div><span className="text-primary">SHA-256:</span> {out.sha256}</div>
          <a href={`https://www.virustotal.com/gui/file/${out.sha256}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-primary underline">→ Check SHA-256 on VirusTotal</a>
        </div>
      )}
    </div>
  );
}

// ── IP Reputation ────────────────────────────────────────────────────────────
function IPReputation() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const lookup = async () => {
    if (!ip.trim()) return;
    setLoading(true); setErr(""); setData(null);
    try {
      const r = await fetch(`https://ipapi.co/${encodeURIComponent(ip.trim())}/json/`);
      if (!r.ok) throw new Error(`Lookup ${r.status}`);
      const d = await r.json();
      if (d.error) throw new Error(d.reason || "Invalid IP");
      setData(d);
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="card-cyber p-6">
      <h3 className="font-display font-bold text-white text-lg mb-1">🌐 IP Reputation & Geo</h3>
      <p className="text-xs text-muted-foreground mb-4 font-mono">Resolve any IPv4/IPv6 address. Cross-check on AbuseIPDB / Shodan.</p>
      <div className="flex gap-2 mb-4">
        <input className="input-cyber flex-1" placeholder="8.8.8.8" value={ip} onChange={e => setIp(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} />
        <button onClick={lookup} disabled={loading} className="btn-cyber">{loading ? "…" : "▸ LOOKUP"}</button>
      </div>
      {err && <p className="text-danger text-sm font-mono">{err}</p>}
      {data && (
        <div className="font-mono text-xs space-y-1">
          <div><span className="text-primary">IP:</span> {data.ip}</div>
          <div><span className="text-primary">Country:</span> {data.country_name} ({data.country_code})</div>
          <div><span className="text-primary">City:</span> {data.city}, {data.region}</div>
          <div><span className="text-primary">ASN:</span> {data.asn} — {data.org}</div>
          <div className="flex flex-wrap gap-2 mt-3">
            <a className="text-primary underline" target="_blank" rel="noopener noreferrer" href={`https://www.abuseipdb.com/check/${data.ip}`}>AbuseIPDB →</a>
            <a className="text-primary underline" target="_blank" rel="noopener noreferrer" href={`https://www.shodan.io/host/${data.ip}`}>Shodan →</a>
            <a className="text-primary underline" target="_blank" rel="noopener noreferrer" href={`https://www.virustotal.com/gui/ip-address/${data.ip}`}>VirusTotal →</a>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SSL Inspector ────────────────────────────────────────────────────────────
function SSLInspector() {
  const [host, setHost] = useState("");
  const open = () => {
    const h = host.trim().replace(/^https?:\/\//, "").split("/")[0];
    if (!h) return;
    window.open(`https://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(h)}&hideResults=on`, "_blank", "noopener");
  };
  return (
    <div className="card-cyber p-6">
      <h3 className="font-display font-bold text-white text-lg mb-1">🔐 SSL / TLS Inspector</h3>
      <p className="text-xs text-muted-foreground mb-4 font-mono">Runs Qualys SSL Labs analysis on any public hostname.</p>
      <div className="flex gap-2">
        <input className="input-cyber flex-1" placeholder="example.com" value={host} onChange={e => setHost(e.target.value)} onKeyDown={e => e.key === "Enter" && open()} />
        <button onClick={open} className="btn-cyber">▸ ANALYZE</button>
      </div>
    </div>
  );
}

// ── Password Strength ────────────────────────────────────────────────────────
function PasswordStrength() {
  const [pw, setPw] = useState("");
  const [pwnCount, setPwnCount] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);

  const score = (() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  })();
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
  const colors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e", "#10b981"];

  const checkPwned = async () => {
    if (!pw) return;
    setChecking(true); setPwnCount(null);
    try {
      const h = (await sha1(pw)).toUpperCase();
      const r = await fetch(`https://api.pwnedpasswords.com/range/${h.slice(0, 5)}`);
      const body = await r.text();
      const suffix = h.slice(5);
      const hit = body.split("\n").find(l => l.startsWith(suffix));
      setPwnCount(hit ? parseInt(hit.split(":")[1]) : 0);
    } catch {
      setPwnCount(-1);
    } finally { setChecking(false); }
  };

  return (
    <div className="card-cyber p-6">
      <h3 className="font-display font-bold text-white text-lg mb-1">🔑 Password Strength + Breach Check</h3>
      <p className="text-xs text-muted-foreground mb-4 font-mono">k-anonymity lookup via HaveIBeenPwned — your password never leaves the device in full.</p>
      <input type="text" className="input-cyber mb-3 font-mono" placeholder="Test a password..." value={pw} onChange={e => setPw(e.target.value)} />
      <div className="h-2 bg-surface border border-border mb-2 overflow-hidden">
        <div style={{ width: `${(score / 5) * 100}%`, background: colors[score] }} className="h-full transition-all" />
      </div>
      <p className="font-mono text-xs mb-3" style={{ color: colors[score] }}>{labels[score]}</p>
      <button onClick={checkPwned} disabled={checking || !pw} className="btn-ghost-cyber text-xs">
        {checking ? "Checking…" : "🛡️ Check against breach DB"}
      </button>
      {pwnCount !== null && (
        <p className={`mt-2 font-mono text-xs ${pwnCount > 0 ? "text-danger" : pwnCount === 0 ? "text-success" : "text-warning"}`}>
          {pwnCount > 0 && `⚠ Found in ${pwnCount.toLocaleString()} breaches — do NOT use.`}
          {pwnCount === 0 && "✓ Not found in known breaches."}
          {pwnCount === -1 && "Lookup failed."}
        </p>
      )}
    </div>
  );
}

// ── Threat Map ───────────────────────────────────────────────────────────────
function ThreatMap() {
  return (
    <div className="card-cyber p-6">
      <h3 className="font-display font-bold text-white text-lg mb-1">🗺️ Live Threat Map</h3>
      <p className="text-xs text-muted-foreground mb-4 font-mono">Real-time global cyberattack visualization.</p>
      <div className="aspect-video w-full border border-border overflow-hidden bg-black">
        <iframe
          src="https://threatmap.checkpoint.com/"
          title="Live Threat Map"
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <a className="text-primary underline" target="_blank" rel="noopener noreferrer" href="https://threatmap.checkpoint.com/">Check Point</a>
        <a className="text-primary underline" target="_blank" rel="noopener noreferrer" href="https://livethreatmap.radware.com/">Radware</a>
        <a className="text-primary underline" target="_blank" rel="noopener noreferrer" href="https://cybermap.kaspersky.com/">Kaspersky</a>
      </div>
    </div>
  );
}

export function ToolsPage() {
  return (
    <section className="container mx-auto px-6 py-14">
      <SectionHeader eyebrow="Toolkit" title="Security Tools" subtitle="Free, browser-based utilities for everyday defensive and investigative work." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CVESearch />
        <HashChecker />
        <IPReputation />
        <SSLInspector />
        <PasswordStrength />
        <ThreatMap />
      </div>
    </section>
  );
}
