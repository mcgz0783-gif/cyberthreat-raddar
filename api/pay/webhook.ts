import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPesapalToken } from "./config";
import { supabase } from "../../src/lib/supabase";
import { sendPurchaseConfirmation } from "../../src/lib/email-delivery";

const PESAPAL_API_URL = process.env.PESAPAL_ENVIRONMENT === 'sandbox' 
  ? 'https://cybqa.pesapal.com/pesapalv3/api' 
  : 'https://pay.pesapal.com/v3/api';

// This is the IPN endpoint that Pesapal will call
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  
  const { OrderTrackingId, OrderNotificationType } = req.query;

  if (OrderNotificationType === 'IPNCHANGE') {
    try {
      const token = await getPesapalToken();
      
      // Verify transaction status
      const response = await fetch(`${PESAPAL_API_URL}/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const statusData = await response.json();
      
      // If status is 'COMPLETED', fulfill the order
      if (statusData.status === 'COMPLETED') {
        const { data: purchase } = await supabase
          .from('payments')
          .select('*, users(email), books(title, download_url)')
          .eq('tracking_id', OrderTrackingId)
          .single();

        if (purchase) {
          await supabase
            .from('payments')
            .update({ status: 'SUCCESS' })
            .eq('tracking_id', OrderTrackingId);
          
          await supabase
            .from('purchases')
            .insert({ user_id: purchase.user_id, book_id: purchase.book_id });

          // Send confirmation email
          await sendPurchaseConfirmation(
            purchase.users.email,
            purchase.books.title,
            purchase.books.download_url
          );
        }
      }
      
      return res.status(200).send('IPN Received');
    } catch (error) {
      console.error('IPN Processing Error:', error);
      return res.status(500).end();
    }
  }
  
  return res.status(200).end();
}
