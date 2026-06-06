import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/cyber/Navbar";
import { Footer } from "@/components/cyber/Misc";
import { FloatingCTA } from "@/components/cyber/FloatingCTA";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
