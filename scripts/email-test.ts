import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account key
const keyPath = path.resolve(__dirname, '../.env/service-account.json');
if (!fs.existsSync(keyPath)) {
  console.error('❌ Service account key not found at:', keyPath);
  process.exit(1);
}

const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

async function main() {
  console.log('📧 Starting email automation test...');
  
  // NOTE: For Gmail API via Nodemailer, you usually use OAuth2
  // or domain-wide delegation. If using a service account directly
  // with Gmail, you MUST enable domain-wide delegation in the Admin console.
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'admin@cyberthreat-raddar.com', // Replace with your admin email
      serviceClient: key.client_id,
      privateKey: key.private_key,
    },
  });

  try {
    // This is a skeleton. Sending will fail without DWD setup.
    console.log('✅ Nodemailer transporter initialized.');
    console.log('Service Email:', key.client_email);
    console.log('Client ID:', key.client_id);
    
    /*
    await transporter.sendMail({
      from: 'admin@cyberthreat-raddar.com',
      to: 'recipient@example.com',
      subject: 'CyberThreat Raddar - Test Email',
      text: 'This is a test of the email automation system.',
    });
    */
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

main();
