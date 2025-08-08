import { connectDB } from "@/lib/mongodb";
import Invite from "@/models/inviteModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// GET /api/users/received?userId=xxxx
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const invites = await Invite.find({ to: userId })
      .populate("from", "email name") // populate sender details
      .sort({ createdAt: -1 }); // optional: newest first

    return NextResponse.json(invites, { status: 200 });
  } catch (error) {
    console.error("Error fetching received invites:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
