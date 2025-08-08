import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await User.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  }).select("name email avatar");

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
