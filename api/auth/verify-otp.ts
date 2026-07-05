import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../../src/lib/supabase";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email, otp } = req.body;
  
  // Verify OTP
  const { data, error } = await supabase
    .from('otps')
    .select('*')
    .eq('email', email)
    .eq('otp', otp)
    .single();

  if (error || !data || new Date(data.expires_at) < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  // OTP Valid - Ensure user exists or create
  let { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({ email })
      .select()
      .single();
    if (createError) return res.status(500).json({ error: 'User creation failed' });
    user = newUser;
  }

  // Clear OTP
  await supabase.from('otps').delete().eq('email', email);

  // Return success (create session/cookie in frontend)
  return res.status(200).json({ user, message: 'Authenticated' });
}
