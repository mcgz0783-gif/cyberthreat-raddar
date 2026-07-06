import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SEO } from "@/components/SEO";

export default function AuthPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get("next") || "/dashboard";

  useEffect(() => {
    if (!loading && user) navigate(next, { replace: true });
  }, [user, loading, next, navigate]);

  return (
    <section className="container mx-auto px-6 py-24 max-w-md">
      <SEO title="Sign in" description="Sign in with Google to access purchases and your dashboard." path="/auth" />
      <div className="card-cyber p-8 text-center">
        <h1 className="font-display font-bold text-2xl text-white mb-2">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">Continue with Google to access your account, purchases, and downloads.</p>
        <button onClick={() => signInWithGoogle(next)} className="btn-cyber w-full py-3 flex items-center justify-center gap-2">
          <span>Continue with Google</span>
        </button>
        <p className="text-[11px] text-muted-foreground mt-4">Browsing does not require sign-in. You'll only be asked when purchasing or accessing your books.</p>
      </div>
    </section>
  );
}
