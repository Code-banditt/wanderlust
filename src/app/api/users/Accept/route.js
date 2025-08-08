import { connectDB } from "@/lib/mongodb";
import Invite from "@/models/inviteModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { inviteId } = await req.json();

    const invite = await Invite.findById(inviteId);
    if (!invite)
      return NextResponse.json({ error: "Invite not found" }, { status: 404 });

    const fromUserId = invite.from;
    const toUserId = invite.to;

    // ✅ Update invite status to "accepted"
    await Invite.findByIdAndUpdate(inviteId, { status: "accepted" });

    // ✅ Add each other as friends
    await User.findByIdAndUpdate(fromUserId, {
      $addToSet: { friends: new mongoose.Types.ObjectId(toUserId) },
    });

    await User.findByIdAndUpdate(toUserId, {
      $addToSet: { friends: new mongoose.Types.ObjectId(fromUserId) },
    });

    return NextResponse.json(
      { message: "Friend added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
