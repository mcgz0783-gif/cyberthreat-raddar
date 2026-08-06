import { auth, defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import searchCveTool from "./tools/search-cve";
import lookupIpTool from "./tools/lookup-ip";
import checkPasswordBreachTool from "./tools/check-password-breach";
import sendEmailTool from "./tools/send-email";
import calendarTool from "./tools/calendar";
import peopleTool from "./tools/people";
import dbListSchemaTool from "./tools/db-list-schema";
import dbQueryTool from "./tools/db-query";
import dbExecuteTool from "./tools/db-execute";
import gitReadFileTool from "./tools/git-read-file";
import gitCommitPushTool from "./tools/git-commit-push";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "cyberhawk-ug-mcp",
  title: "CyberHawk UG",
  version: "0.2.0",
  instructions:
    "Cybersecurity and platform-management tools from CyberHawk UG. Callers must sign in as a CyberHawk UG user. Security research: `search_cve` (NIST NVD), `lookup_ip` (geolocation/ASN), `check_password_breach` (HaveIBeenPwned). Google automation: `send_email`, `create_calendar_event`, `list_contacts`. Database administration (requires the `admin` role): `db_list_schema` to inspect tables, columns and access policies, `db_query` for read-only SELECTs, `db_execute` for data changes and schema migrations. Source control (requires the `admin` role): `git_read_file` to read repository files and `git_commit_push` to commit files and push to main. Use `echo` to verify connectivity.",
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
    dbListSchemaTool,
    dbQueryTool,
    dbExecuteTool,
    gitReadFileTool,
    gitCommitPushTool,
  ],
});

