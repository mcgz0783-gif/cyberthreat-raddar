import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPurchaseConfirmation = async (email: string, bookTitle: string, downloadLink: string) => {
  await transporter.sendMail({
    from: '"CyberHawk UG" <no-reply@cyberhawk-ug.store>',
    to: email,
    subject: `Purchase Confirmation: ${bookTitle}`,
    text: `Thank you for your purchase! You can download your copy of "${bookTitle}" here: ${downloadLink}`,
    html: `<p>Thank you for your purchase!</p><p>You can download your copy of "<strong>${bookTitle}</strong>" here: <a href="${downloadLink}">Download Now</a></p>`,
  });
};
