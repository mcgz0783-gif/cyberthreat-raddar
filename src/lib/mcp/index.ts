import { auth, defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import searchCveTool from "./tools/search-cve";
import lookupIpTool from "./tools/lookup-ip";
import checkPasswordBreachTool from "./tools/check-password-breach";
import sendEmailTool from "./tools/send-email";
import calendarTool from "./tools/calendar";
import peopleTool from "./tools/people";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "cyberhawk-ug-mcp",
  title: "CyberHawk UG",
  version: "0.1.0",
  instructions:
    "Cybersecurity tools from CyberHawk UG. Callers must sign in as a CyberHawk UG user. Use `search_cve` to look up vulnerabilities in the NIST NVD, `lookup_ip` for IP geolocation and ASN info, `check_password_breach` for HaveIBeenPwned password checks, `send_email` for Gmail automation, `create_calendar_event` for scheduling, `list_contacts` for contact management, and `echo` to verify connectivity.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    echoTool,
    searchCveTool,
    lookupIpTool,
    checkPasswordBreachTool,
    sendEmailTool,
    calendarTool,
    peopleTool,
  ],
});
