import { HelmetProvider } from "react-helmet-async";
import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.tsx";
import "./index.css";

export const createApp = ViteSSG(
  App,
  {
    routes: [
      { path: "/", name: "home" },
      { path: "/news", name: "news" },
      { path: "/insights", name: "insights" },
      { path: "/blog", name: "blog" },
      { path: "/books", name: "books" },
      { path: "/about", name: "about" },
      { path: "/contact", name: "contact" },
      { path: "/tools", name: "tools" },
      { path: "/courses", name: "courses" },
      { path: "/privacy", name: "privacy" },
      { path: "/terms", name: "terms" },
    ],
  },
  ({ app }) => (
    <HelmetProvider>
      {app}
    </HelmetProvider>
  )
);
