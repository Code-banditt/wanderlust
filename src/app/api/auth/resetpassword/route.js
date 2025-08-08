// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";
export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectDB();
  const { email, token, password } = await req.json();

  if (!email || !token || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    email,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return NextResponse.json(
      { message: "Invalid or expired token." },
      { status: 400 }
    );

  user.password = await bcrypt.hash(password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return NextResponse.json({ message: "Password reset successful." });
}
