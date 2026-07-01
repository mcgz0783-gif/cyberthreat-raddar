# Security Policy for cyberthreat-raddar

This policy defines the security standards for this repository.

## 1. Development Standards
- All code changes affecting API authentication or data processing MUST be reviewed.
- Production environment must use environment variables loaded at runtime; no keys in code.

## 2. Dependencies
- Run `npm audit` before every major release.
- Only use approved UI libraries (Shadcn/Tailwind).

## 3. Reporting Vulnerabilities
- Report suspected issues to the project maintainer immediately.
