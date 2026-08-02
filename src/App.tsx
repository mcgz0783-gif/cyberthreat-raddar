import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
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
import AuthPage from "@/pages/Auth";
import AuthCallback from "@/pages/AuthCallback";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import PaymentCallback from "@/pages/PaymentCallback";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="cyber-ui-theme">
      <TooltipProvider>
        <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:id" element={<InsightsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BooksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/payment/callback" element={<PaymentCallback />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {import.meta.env.PROD && <Analytics />}
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
