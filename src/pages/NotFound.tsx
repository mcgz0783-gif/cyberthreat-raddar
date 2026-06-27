import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <SEO title="404 — Page Not Found" description="The requested page could not be found on our secure servers." />
      <div className="noise-overlay" />
      <div className="absolute inset-0 hero-grid-bg opacity-30" />
      
      <div className="text-center relative z-10 p-8 card-cyber max-w-md">
        <div className="text-8xl mb-6 float-anim">⚠️</div>
        <h1 className="font-display font-black text-white text-6xl mb-2">404</h1>
        <div className="font-mono text-primary text-xs tracking-[4px] mb-6 uppercase">Error // Resource Not Found</div>
        <p className="text-foreground/70 mb-8 leading-relaxed">
          The requested data packet [ <span className="text-primary font-mono">{location.pathname}</span> ] was not found or has been purged from the active node.
        </p>
        <button 
          onClick={() => navigate("/")} 
          className="btn-cyber w-full"
        >
          RETURN TO COMMAND CENTER
        </button>
      </div>
    </div>
  );
};

export default NotFound;
