import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Shield, Lock } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cyber-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cyber-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cyber-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 fade-in">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-background/95 backdrop-blur-xl border border-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden relative group">
          {/* Animated Glow Effect */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-white text-lg tracking-tight">Privacy & Cookie Intelligence</h3>
                <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
                  We use cookies and telemetry to improve your experience and ensure our library remains open-access. 
                  By clicking "Accept All", you agree to our data practices optimized for global security education.
                  Read our <Link to="/privacy" className="text-primary hover:underline underline-offset-4">Privacy Policy</Link> for details.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button 
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-accent text-xs font-bold tracking-widest uppercase transition-all"
              >
                Essential Only
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-primary text-black hover:scale-105 active:scale-95 text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
              >
                Accept All
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-white/10 text-muted-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Bottom Scanner Detail */}
          <div className="h-1 w-full bg-border/20 overflow-hidden">
            <div className="h-full bg-primary/40 w-1/3 animate-scan shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
