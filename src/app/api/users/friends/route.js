// Corrected /api/users/friends route
import { connectDB } from "@/lib/mongodb";
import Invite from "@/models/inviteModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const friends = await Invite.find({
      status: "accepted",
      $or: [{ from: userId }, { to: userId }],
    })
      .populate("from")
      .populate("to");

    return NextResponse.json(friends, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
