import { sendEmail } from "@/app/_Helper Functions/sendEmail";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return new Response("Missing fields", { status: 400 });
    }

    const html = `
      <div style="font-family: sans-serif;">
        <h2>${subject}</h2>
        <p>${message}</p>
      </div>
    `;

    await sendEmail({ to, subject, html });

    return new Response("Email sent", { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return new Response("Failed to send email", { status: 500 });
  }
}
