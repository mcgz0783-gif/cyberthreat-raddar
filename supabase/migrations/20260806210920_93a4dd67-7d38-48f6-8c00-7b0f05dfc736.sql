-- Admin-gated query helper: returns rows as JSON
CREATE OR REPLACE FUNCTION public.mcp_admin_query(sql text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'not authorized: admin role required';
  END IF;

  IF sql IS NULL OR btrim(sql) = '' THEN
    RAISE EXCEPTION 'empty statement';
  END IF;

  EXECUTE format('SELECT coalesce(jsonb_agg(row_to_json(t)), ''[]''::jsonb) FROM (%s) t', sql)
    INTO result;

  RETURN result;
END;
$$;

-- Admin-gated execute helper: DDL / DML, returns a status string
CREATE OR REPLACE FUNCTION public.mcp_admin_execute(sql text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'not authorized: admin role required';
  END IF;

  IF sql IS NULL OR btrim(sql) = '' THEN
    RAISE EXCEPTION 'empty statement';
  END IF;

  EXECUTE sql;
  RETURN 'ok';
END;
$$;

REVOKE ALL ON FUNCTION public.mcp_admin_query(text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.mcp_admin_execute(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mcp_admin_query(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.mcp_admin_execute(text) TO authenticated;