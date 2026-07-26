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

## Supported Gemini Models
The following models are available for use within this project:
- **gemini-2.0-flash-001**: Fastest, most cost-efficient for high-volume tasks.
- **gemini-2.0-flash-lite-preview-02-05**: Optimized for low latency.
- **gemini-1.5-pro**: High intelligence for complex reasoning and large context windows (up to 2M tokens).
- **gemini-1.5-flash**: Balanced performance and speed.
- **gemini-1.5-flash-8b**: Ultra-lightweight for simple, fast tasks.
- **text-embedding-004**: For semantic search and RAG implementations.
