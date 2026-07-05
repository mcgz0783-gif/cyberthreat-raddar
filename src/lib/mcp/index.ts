import { defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import searchCveTool from "./tools/search-cve";
import lookupIpTool from "./tools/lookup-ip";
import checkPasswordBreachTool from "./tools/check-password-breach";

export default defineMcp({
  name: "cyberhawk-ug-mcp",
  title: "CyberHawk UG",
  version: "0.1.0",
  instructions:
    "Cybersecurity tools from CyberHawk UG. Use `search_cve` to look up vulnerabilities in the NIST NVD, `lookup_ip` for IP geolocation and ASN info, `check_password_breach` for HaveIBeenPwned password checks, and `echo` to verify connectivity.",
  tools: [echoTool, searchCveTool, lookupIpTool, checkPasswordBreachTool],
});
