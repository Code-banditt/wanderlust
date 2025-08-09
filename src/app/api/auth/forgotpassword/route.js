import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
    console.error("Gmail credentials not defined");
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    await connectDB();
    const { email } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email not found." },
        { status: 404 }
      );
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Save token and expiration in DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15; // 15 minutes
    await user.save();

    // Build reset link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetUrl = `${baseUrl}/resetPassword?token=${token}&email=${user.email}`;

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"WanderLust" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>
        <p>You requested a password reset. Click the link below:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return NextResponse.json({ message: "Reset link sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
