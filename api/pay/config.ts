import type { VercelRequest, VercelResponse } from "@vercel/node";

const PESAPAL_API_URL = process.env.PESAPAL_ENVIRONMENT === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3/api' 
  : 'https://pay.pesapal.com/v3/api';

export async function getPesapalToken() {
  const response = await fetch(`${PESAPAL_API_URL}/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });

  if (!response.ok) throw new Error('Failed to authenticate with Pesapal');
  
  const data = await response.json();
  return data.token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // This endpoint is primarily for internal server-to-server calls.
  // Not intended to be exposed to frontend directly.
  return res.status(405).json({ error: 'Use via internal functions' });
}
