import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { orderTrackingId, bookId } = req.query;

  if (!orderTrackingId) {
    return res.status(400).json({ error: "Missing orderTrackingId" });
  }

  try {
    const logPath = path.join('/tmp', 'transactions.json');
    
    if (!fs.existsSync(logPath)) {
      return res.status(200).json({ status: "Pending", unlocked: false });
    }

    const transactions = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    const success = transactions.find((t: any) => t.id === orderTrackingId && t.status === "Completed");

    if (success) {
      return res.status(200).json({ status: "Completed", unlocked: true });
    }

    return res.status(200).json({ status: "Pending", unlocked: false });

  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
