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

export const sendOTP = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: '"CyberHawk UG" <no-reply@cyberhawk-ug.store>',
    to: email,
    subject: 'Your CyberHawk UG Purchase Authentication Code',
    text: `Your authentication code is: ${otp}. It expires in 10 minutes.`,
    html: `<p>Your authentication code is: <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
  });
};
