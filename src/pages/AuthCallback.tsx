import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AuthCallback() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    const target = sessionStorage.getItem("post_auth_redirect") || "/dashboard";
    sessionStorage.removeItem("post_auth_redirect");
    navigate(user ? target : "/auth", { replace: true });
  }, [user, loading, navigate]);
  return <div className="container mx-auto px-6 py-24 text-center text-muted-foreground">Signing you in…</div>;
}
