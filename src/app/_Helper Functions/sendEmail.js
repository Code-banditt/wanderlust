// lib/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  return await resend.emails.send({
    from: "onboarding@resend.dev", // ✅ only works in sandbox/dev
    to,
    subject,
    html,
  });
}
