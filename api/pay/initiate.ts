import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPesapalToken } from "./config";

const PESAPAL_API_URL = process.env.PESAPAL_ENVIRONMENT === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3/api' 
  : 'https://pay.pesapal.com/v3/api';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { amount, email, orderTrackingId } = req.body;
  
  try {
    const token = await getPesapalToken();

    const response = await fetch(`${PESAPAL_API_URL}/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: orderTrackingId,
        currency: 'USD',
        amount: amount,
        description: 'eBook Purchase',
        callback_url: 'https://www.cyberhawk-ug.store/payment/callback',
        notification_id: process.env.PESAPAL_IPN_ID,
        billing_address: { email_address: email }
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Pesapal Init Error:', error);
    return res.status(500).json({ error: 'Failed to initiate payment' });
  }
}
