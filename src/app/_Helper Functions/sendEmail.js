// lib/email.js
import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  // Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail address
      pass: process.env.GMAIL_APP_PASS, // app password (not normal password)
    },
  });

  // Send email
  return await transporter.sendMail({
    from: `"Wanderlust" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
