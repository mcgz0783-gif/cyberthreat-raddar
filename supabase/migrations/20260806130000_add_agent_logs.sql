
-- AGENT LOGS
CREATE TABLE public.agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name TEXT NOT NULL,
  action TEXT NOT NULL,
  status TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.agent_logs TO anon, authenticated;
GRANT INSERT ON public.agent_logs TO authenticated;
GRANT ALL ON public.agent_logs TO service_role;

ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "agent_logs public read" ON public.agent_logs FOR SELECT USING (true);
CREATE POLICY "admin write agent_logs" ON public.agent_logs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
