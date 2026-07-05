import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../../src/lib/supabase";
import { sendOTP } from "../../src/lib/email";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60000).toISOString();

  // Store or Update OTP in Supabase
  const { error } = await supabase
    .from('otps')
    .upsert({ email, otp, expires_at: expiresAt }, { onConflict: 'email' });

  if (error) return res.status(500).json({ error: 'Failed to generate OTP' });

  await sendOTP(email, otp);
  
  return res.status(200).json({ message: 'OTP sent' });
}
