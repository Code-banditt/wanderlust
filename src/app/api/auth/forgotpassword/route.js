import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import crypto from "crypto";
import { Resend } from "resend";

export async function POST(req) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not defined");
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "Email not found." },
        { status: 404 }
      );

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 minutes
    await user.save();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/reset-password?token=${token}&email=${user.email}`;

    try {
      await resend.emails.send({
        from: "YourApp <onboarding@resend.dev>",
        to: email,
        subject: "Reset your password",
        html: `
          <h2>Reset Password</h2>
          <p>You requested a password reset. Click the link below to proceed:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 15 minutes.</p>
        `,
      });
    } catch (err) {
      console.error("Email send failed:", err);
      return NextResponse.json(
        { message: "Failed to send reset email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Reset link sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
