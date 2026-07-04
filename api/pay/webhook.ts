import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPesapalAuthToken, PESAPAL_CONFIG } from "./config";
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // PesaPal IPN is usually a GET or POST depending on registration
  const { OrderTrackingId, OrderMerchantReference } = req.query;

  if (!OrderTrackingId) {
    return res.status(400).json({ error: "Missing OrderTrackingId" });
  }

  try {
    const token = await getPesapalAuthToken();

    // Verify transaction status
    const response = await fetch(`${PESAPAL_CONFIG.base_url}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    if (data.status === "200" && data.payment_status_description === "Completed") {
      // Record successful transaction
      // For this prototype, we'll use a file in /tmp to simulate persistence
      const logPath = path.join('/tmp', 'transactions.json');
      let transactions: any[] = [];
      
      if (fs.existsSync(logPath)) {
        transactions = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      }

      transactions.push({
        id: OrderTrackingId,
        ref: OrderMerchantReference,
        status: "Completed",
        date: new Date().toISOString()
      });

      fs.writeFileSync(logPath, JSON.stringify(transactions));
      console.log(`✅ Transaction ${OrderTrackingId} completed and recorded.`);
    }

    // Always respond with a 200 to PesaPal to acknowledge receipt
    return res.status(200).json({ 
      order_tracking_id: OrderTrackingId,
      status: data.payment_status_description 
    });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
