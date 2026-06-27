# Project Instructions: cyberthreat-raddar

## Tech Stack
- React (Vite)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Vertex AI & Gemini SDKs
- Google Cloud Storage

## Specialized Agents
- **cyber-agent**: Invoke with `@cyber-agent` for security audits and project management advice.

## Workflow & Best Practices

### Editing & Development
- Always run `npm run dev` to preview changes.
- Ensure TypeScript types are respected; avoid using `any`.
- Use Shadcn UI components located in `src/components/ui`.

### Committing & Version Control
- Use clear, descriptive commit messages.
- Format: `feat: <description>`, `fix: <description>`, `docs: <description>`, `refactor: <description>`.
- Always run `npm run lint` and `npm run test` before committing.
- **Pushing to Main**: Ensure your local `main` is up to date with `origin main` before pushing.

### Deployment
- This project is configured for Vercel (see `vercel.json`).
- Deployment is usually automatic on push to the `main` branch.
- Use `npm run build` locally to verify the production build before pushing.

### Vertex AI Tools
- Use the built-in Vertex tools (`list_prompts`, `create_prompt`, `run_data_driven_optimize`, etc.) for managing LLM interactions.
- Optimized prompts should be stored and managed via the Vertex AI Prompt Management tools.
