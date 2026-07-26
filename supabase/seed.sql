
-- AUTHORS
INSERT INTO public.authors (id, name, slug, bio) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'CyberHawk UG', 'cyberhawk-ug', 'Leading cybersecurity research and education collective in East Africa.'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Dr. Sarah Chen', 'sarah-chen', 'Security architect specializing in Zero Trust and enterprise security.'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Marcus Webb', 'marcus-webb', 'Threat analyst with a focus on phishing and social engineering.'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Aisha Patel', 'aisha-patel', 'Cloud security expert and Kubernetes contributor.'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'James Okonkwo', 'james-okonkwo', 'SOC manager and incident response specialist.');

-- CATEGORIES
INSERT INTO public.categories (id, name, slug, description) VALUES
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Offensive Security', 'offensive-security', 'Penetration testing, exploit development, and bug bounty hunting.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Blue Team', 'blue-team', 'Defensive security, incident response, and threat hunting.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Architecture', 'architecture', 'Security design, Zero Trust, and network hardening.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'AI & Automation', 'ai-automation', 'Securing AI systems and using AI for security automation.'),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'Threat Intel', 'threat-intel', 'Real-time threat monitoring and intelligence analysis.');

-- BOOKS
INSERT INTO public.books (title, slug, description, author_id, category_id, price_cents, currency, published, preview_only) VALUES
('The Art of Intrusion', 'art-of-intrusion', 'True stories of real hackers who broke into banks, government computers, and the phone system.', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 0, 'USD', true, true),
('Hacking: The Art of Exploitation', 'hacking-art-of-exploitation', 'A deep dive into the technical aspects of exploits, shellcode, and network attacks.', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 0, 'USD', true, true),
('Building & Using AI Agents to Make Money', 'building-ai-agents', 'A practical playbook for designing, deploying, and monetizing AI agents.', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 1500, 'USD', true, false);

-- NEWS
INSERT INTO public.news (cat, color, title, summary, tags, icon) VALUES
('Threat Intel', 'danger', 'Critical Zero-Day in Apache HTTP Server Actively Exploited', 'Security researchers have confirmed active exploitation of a critical RCE vulnerability.', ARRAY['CVE-2025','RCE','Apache'], '⚠️'),
('Data Breach', 'warning', 'Major Healthcare Provider Exposes 12M Patient Records', 'A misconfigured cloud storage bucket exposed sensitive patient data.', ARRAY['Healthcare','Cloud','PII'], '🏥'),
('AI Security', 'primary', 'LLM Prompt Injection Attacks Surge 340% in Q1 2025', 'New threat intelligence report reveals dramatic increase in AI-targeted attacks.', ARRAY['AI','LLM','Prompt Injection'], '🤖');

-- BLOG POSTS (POSTS)
INSERT INTO public.posts (title, slug, author_id, category, summary, featured) VALUES
('Zero Trust Architecture: A Practical Implementation Guide', 'zero-trust-guide', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Architecture', 'Zero Trust is no longer optional. This comprehensive guide walks through implementation.', true),
('The Future of AI Agents in Cybersecurity', 'future-ai-agents', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'AI Security', 'Explore how autonomous AI agents are revolutionizing threat detection.', true);

-- TICKER ITEMS
INSERT INTO public.ticker_items (content, priority) VALUES
('⚡ CRITICAL: Apache Zero-Day CVE-2025-1234 under active exploitation', 1),
('🔴 ALERT: LockBit 4.0 targets EU critical infrastructure', 1),
('🤖 AI prompt injection attacks up 340% in Q1 2025', 0);

-- STATS
INSERT INTO public.stats (value, label, icon, sort_order) VALUES
('2,365', 'Cyberattacks/Day', '⚡', 0),
('$5.3M', 'Avg Breach Cost', '💸', 1),
('95%', 'Human Factor', '🧑‍💻', 2);

-- TOOLS
INSERT INTO public.tools (name, icon, description, color, path, sort_order) VALUES
('Threat Map', '🗺️', 'Live global cyberattack visualization', 'hsl(var(--danger))', '/tools/map', 0),
('CVE Search', '🔍', 'Search latest vulnerabilities by CVE ID', 'hsl(var(--primary))', '/tools/cve', 1),
('Hash Checker', '#️⃣', 'Verify file integrity & detect malware', 'hsl(var(--success))', '/tools/hash', 2);
