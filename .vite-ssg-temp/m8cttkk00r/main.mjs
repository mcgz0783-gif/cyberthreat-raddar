import { jsx, jsxs } from "react/jsx-runtime";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createHead } from "@unhead/vue/server";
import { defineComponent, ref, onMounted, createSSRApp } from "vue";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useLocation, Link, Outlet } from "react-router-dom";
const ClientOnly = defineComponent({
  setup(props, { slots }) {
    const mounted = ref(false);
    onMounted(() => mounted.value = true);
    return () => {
      if (!mounted.value)
        return slots.placeholder && slots.placeholder({});
      return slots.default && slots.default({});
    };
  }
});
function ViteSSG(App2, fn, options) {
  const {
    transformState,
    registerComponents = true,
    useHead = true,
    rootContainer = "#app"
  } = options ?? {};
  async function createApp$1() {
    const app = createSSRApp(App2);
    let head;
    if (useHead) {
      app.use(head = createHead());
    }
    const appRenderCallbacks = [];
    const onSSRAppRendered = (cb) => appRenderCallbacks.push(cb);
    const triggerOnSSRAppRendered = () => {
      return Promise.all(appRenderCallbacks.map((cb) => cb()));
    };
    const context = {
      app,
      head,
      isClient: false,
      router: void 0,
      routes: void 0,
      initialState: {},
      onSSRAppRendered,
      triggerOnSSRAppRendered,
      transformState
    };
    if (registerComponents)
      app.component("ClientOnly", ClientOnly);
    await (fn == null ? void 0 : fn(context));
    const initialState = context.initialState;
    return {
      ...context,
      initialState
    };
  }
  return createApp$1;
}
const Toaster$1 = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref: ref2,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref2) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref: ref2, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref: ref2,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref: ref2,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref: ref2, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref2) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref: ref2, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref2) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref: ref2,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
function Logo({ onClick }) {
  return /* @__PURE__ */ jsxs("div", { onClick, className: `flex items-center gap-3 bg-transparent border-0 ${onClick ? "cursor-pointer" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "hex-badge w-10 h-10 bg-primary/15 border border-primary flex items-center justify-center text-primary text-xl font-bold shadow-glow", children: "🛡" }),
    /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
      /* @__PURE__ */ jsx("div", { className: "font-display font-black text-white text-lg leading-none tracking-wider", children: "cyberhawk UG" }),
      /* @__PURE__ */ jsx("div", { className: "font-mono text-[10px] text-primary tracking-[3px] mt-0.5 uppercase", children: "Intelligence // v2.6" })
    ] })
  ] });
}
const NAV = [
  { label: "Home", path: "/" },
  { label: "News", path: "/news" },
  { label: "Insights", path: "/insights" },
  { label: "Blog", path: "/blog" },
  { label: "Books", path: "/books" },
  { label: "Tools", path: "/tools" },
  { label: "Courses", path: "/courses" },
  { label: "About", path: "/about" }
];
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activePage = useMemo(() => {
    const path = location.pathname;
    if (path === "/") return "Home";
    const segment = path.slice(1);
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }, [location.pathname]);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return /* @__PURE__ */ jsxs("nav", { className: `sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between py-4", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", onClick: () => window.scrollTo(0, 0), children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-8", children: [
        NAV.map((n) => /* @__PURE__ */ jsx(
          Link,
          {
            to: n.path,
            onClick: () => window.scrollTo(0, 0),
            className: `nav-link-item ${activePage === n.label ? "active" : ""}`,
            children: n.label
          },
          n.label
        )),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "btn-cyber text-xs", onClick: () => window.scrollTo(0, 0), children: "SUBSCRIBE" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden border border-border text-primary px-3 py-1.5 text-lg",
          onClick: () => setMobileOpen(!mobileOpen),
          "aria-label": "Toggle menu",
          children: mobileOpen ? "✕" : "☰"
        }
      )
    ] }),
    mobileOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden bg-surface border-t border-border container mx-auto py-2", children: NAV.map((n) => /* @__PURE__ */ jsx(
      Link,
      {
        to: n.path,
        onClick: () => setMobileOpen(false),
        className: `block w-full text-left py-3 font-bold text-base tracking-[2px] uppercase border-b border-border/40 ${activePage === n.label ? "text-primary" : "text-foreground"}`,
        children: n.label
      },
      n.label
    )) })
  ] });
}
function Footer() {
  const links = [
    { section: "Platform", items: [
      { label: "Home", path: "/" },
      { label: "News", path: "/news" },
      { label: "Insights", path: "/insights" },
      { label: "Blog", path: "/blog" },
      { label: "Books", path: "/books" }
    ] },
    { section: "Company", items: [
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms", path: "/terms" }
    ] },
    { section: "Resources", items: [
      { label: "CVE Database", path: "/tools" },
      { label: "Security Tools", path: "/tools" },
      { label: "Free Courses", path: "/courses" },
      { label: "Threat Map", path: "/tools" }
    ] }
  ];
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-surface/50 mt-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-14", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", onClick: () => window.scrollTo(0, 0), children: /* @__PURE__ */ jsx(Logo, {}) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/80 mt-4 max-w-sm leading-relaxed", children: "The definitive platform for cybersecurity professionals. Global intelligence, expert analysis, and continuous education." }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-5", children: ["𝕏", "in", "gh", "▶"].map((s) => /* @__PURE__ */ jsx("a", { href: "#", className: "w-9 h-9 border border-border text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors text-sm font-bold", children: s }, s)) })
      ] }),
      links.map(({ section, items }) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-display font-bold text-white text-sm tracking-wider uppercase mb-4", children: section }),
        items.map((item) => /* @__PURE__ */ jsx(
          Link,
          {
            to: item.path,
            onClick: () => window.scrollTo(0, 0),
            className: "block text-sm text-muted-foreground mb-2.5 cursor-pointer hover:text-primary transition-colors",
            children: item.label
          },
          item.label
        ))
      ] }, section)),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-display font-bold text-white text-sm tracking-wider uppercase mb-4", children: "Contact" }),
        [
          { icon: "✉", val: "kevlarmackenzie@gmail.com" },
          { icon: "📞", val: "0783699626" },
          { icon: "💬", val: "WhatsApp: 0788213106" }
        ].map((c) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-2.5 break-all", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: c.icon }),
          c.val
        ] }, c.val))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-border text-xs font-mono text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { children: "© 2026 cyberhawk UG. All rights reserved." }),
      /* @__PURE__ */ jsx("span", { className: "text-primary tracking-widest uppercase", children: "cyberhawk UG — Secure // Encrypted // Verified" })
    ] })
  ] }) });
}
function FloatingCTA() {
  const wa = "256788213106";
  const tel = "+256783699626";
  const waMsg = encodeURIComponent("Hello cyberhawk UG, I'd like to connect.");
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-5 right-5 z-40 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: `https://wa.me/${wa}?text=${waMsg}`,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "Chat on WhatsApp",
        className: "group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform",
        children: [
          /* @__PURE__ */ jsx("svg", { viewBox: "0 0 32 32", className: "w-7 h-7 fill-current", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19.11 17.27c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.63.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.49.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.48-.16-.01-.35-.01-.54-.01-.19 0-.49.07-.74.35-.26.28-.97.95-.97 2.31s.99 2.68 1.13 2.87c.14.19 1.95 2.98 4.72 4.18.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.06-.12-.25-.19-.53-.33zM16.03 4C9.4 4 4 9.4 4 16.03c0 2.12.56 4.18 1.61 6L4 28l6.13-1.6a12.04 12.04 0 0 0 5.9 1.5h.01c6.63 0 12.03-5.4 12.03-12.03 0-3.21-1.25-6.23-3.52-8.5A12.01 12.01 0 0 0 16.03 4z" }) }),
          /* @__PURE__ */ jsx("span", { className: "absolute right-16 bg-background border border-border px-3 py-1 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: "WhatsApp Chat" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: `tel:${tel}`,
        "aria-label": "Call us",
        className: "group w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_8px_24px_hsl(var(--primary)/0.45)] hover:scale-110 transition-transform relative",
        children: [
          /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "w-6 h-6 fill-current", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M6.6 10.8a15.05 15.05 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1.1.5 1.1 1.1V20c0 .6-.5 1.1-1.1 1.1C9.4 21.1 2.9 14.6 2.9 6.1 2.9 5.5 3.4 5 4 5h3.5c.6 0 1.1.5 1.1 1.1 0 1.3.2 2.4.6 3.5.1.4 0 .8-.3 1.1l-2.3 2.1z" }) }),
          /* @__PURE__ */ jsx("span", { className: "absolute right-16 bg-background border border-border px-3 py-1 text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: "Call Now" })
        ]
      }
    )
  ] });
}
const BASE_URL = "https://www.cyberhawk-ug.store";
function SEO({ title, description, path = "", ogImage }) {
  const url = `${BASE_URL}${path}`;
  const image = ogImage || "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/712a1042-8c77-496d-a54f-efe8fd604e06/id-preview-d95e04eb--b59f06b6-dc4b-4f75-9b4c-6576005a2e6e.lovable.app-1777825138735.png";
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image })
  ] });
}
const PAGE_SEO = {
  "/": { title: "CyberSec Updates — Live Threat Intelligence Platform", description: "Global cybersecurity news, threat intelligence, expert blog posts, and curated security books for professionals." },
  "/news": { title: "Threat News — CyberSec Updates", description: "Latest cybersecurity threats, breaches, exploits, and vulnerability disclosures from across the globe." },
  "/insights": { title: "Expert Insights — CyberSec Updates", description: "Deep-dive research, policy briefs, and industry analysis from leading security professionals and institutions." },
  "/blog": { title: "Security Blog — CyberSec Updates", description: "Technical guides, war stories, and tactical cybersecurity writing from practitioners." },
  "/books": { title: "Cybersecurity Books by cyberhawk UG | The Art of Intrusion, Hacking, and more", description: "The essential cybersecurity bookshelf by cyberhawk UG — including The Art of Intrusion, Hacking: The Art of Exploitation, and specialized guides for offensive security, blue team, and AI agents." },
  "/about": { title: "About — CyberSec Updates", description: "Learn about our mission, our CEO Samuel Mucunguzi, our associate Dr. FadJuma, and the team behind CyberSec Updates." },
  "/contact": { title: "Contact — CyberSec Updates", description: "Get in touch with the CyberSec Updates team for partnerships, media, and general inquiries." },
  "/tools": { title: "Security Tools — CyberSec Updates", description: "Free security utilities: CVE search, hash checker, IP reputation lookup, SSL inspector, and threat map." },
  "/courses": { title: "Free Courses — CyberSec Updates", description: "Curated free cybersecurity certifications, training resources, and educational pathways." },
  "/privacy": { title: "Privacy Policy — CyberSec Updates", description: "How CyberSec Updates handles your data, cookies, and privacy commitments." },
  "/terms": { title: "Terms of Service — CyberSec Updates", description: "Terms and conditions for using the CyberSec Updates platform and services." }
};
function RouteSEO() {
  const { pathname } = useLocation();
  const cfg = PAGE_SEO[pathname] || PAGE_SEO["/"];
  return /* @__PURE__ */ jsx(SEO, { title: cfg.title, description: cfg.description, path: pathname });
}
function Layout() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("div", { className: "noise-overlay" }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(RouteSEO, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingCTA, {})
  ] });
}
const queryClient = new QueryClient();
const App = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Layout, {}),
  /* @__PURE__ */ jsx(Analytics, {})
] }) });
const createApp = ViteSSG(
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
      { path: "/terms", name: "terms" }
    ]
  },
  ({ app }) => /* @__PURE__ */ jsx(HelmetProvider, { children: app })
);
export {
  createApp
};
