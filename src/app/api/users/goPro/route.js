import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const PATCH = async (req) => {
  try {
    await connectDB();
    const { userId } = await req.json();
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { role: "premium" },
      { new: true }
    );

    return NextResponse(json.stringify(updateUser), { status: 200 });
  } catch (err) {
    return NextResponse("failed to upgrade user", { status: 500 });
  }
};
