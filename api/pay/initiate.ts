import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPesapalAuthToken, PESAPAL_CONFIG } from "./config";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { bookId, currency, amount, email, firstName, lastName } = req.body;

  try {
    const token = await getPesapalAuthToken();

    // 1. Register IPN if not already done (In a real app, this should be pre-registered)
    // For this prototype, we'll assume the IPN is already registered and we have a notification_id
    const notificationId = process.env.PESAPAL_IPN_ID;

    if (!notificationId) {
      throw new Error("Missing PESAPAL_IPN_ID environment variable");
    }

    // 2. Submit Order
    const orderRequest = {
      id: `ORDER-${bookId}-${Date.now()}`,
      currency: currency || "USD",
      amount: amount,
      description: `Purchase of CyberHawk UG Book ID: ${bookId}`,
      callback_url: `${process.env.APP_URL}/books/${bookId}?status=check`,
      notification_id: notificationId,
      billing_address: {
        email_address: email,
        first_name: firstName || "Customer",
        last_name: lastName || "User"
      }
    };

    const response = await fetch(`${PESAPAL_CONFIG.base_url}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderRequest)
    });

    const data = await response.json();

    if (data.status !== "200") {
      throw new Error(data.error?.message || 'Failed to submit order to PesaPal');
    }

    return res.status(200).json({ 
      redirect_url: data.redirect_url,
      order_tracking_id: data.order_tracking_id
    });

  } catch (error: any) {
    console.error("Payment Initiation Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
