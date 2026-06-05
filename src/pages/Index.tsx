import { useState } from "react";
import { Navbar } from "@/components/cyber/Navbar";
import { Footer } from "@/components/cyber/Misc";
import { FloatingCTA } from "@/components/cyber/FloatingCTA";
import { HomePage } from "@/components/cyber/pages/HomePage";
import { NewsPage } from "@/components/cyber/pages/NewsPage";
import { InsightsPage } from "@/components/cyber/pages/InsightsPage";
import { BlogPage } from "@/components/cyber/pages/BlogPage";
import { BooksPage } from "@/components/cyber/pages/BooksPage";
import { AboutPage } from "@/components/cyber/pages/AboutPage";
import { ContactPage } from "@/components/cyber/pages/ContactPage";
import { ToolsPage } from "@/components/cyber/pages/ToolsPage";
import { CoursesPage } from "@/components/cyber/pages/CoursesPage";
import { PrivacyPage } from "@/components/cyber/pages/PrivacyPage";
import { TermsPage } from "@/components/cyber/pages/TermsPage";

const Index = () => {
  const [page, setPage] = useState("Home");

  const renderPage = () => {
    switch (page) {
      case "News": return <NewsPage />;
      case "Insights": return <InsightsPage />;
      case "Blog": return <BlogPage />;
      case "Books": return <BooksPage />;
      case "About": return <AboutPage />;
      case "Contact": return <ContactPage />;
      case "Tools":
      case "CVE": return <ToolsPage />;
      case "Courses": return <CoursesPage />;
      case "Privacy": return <PrivacyPage />;
      case "Terms": return <TermsPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
      <FloatingCTA />
    </div>
  );
};

export default Index;
