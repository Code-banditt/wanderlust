// /api/invites/send.js (POST)
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import Invite from "@/models/inviteModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { fromId, toEmail, tripName } = await req.json(); // App Router: use req.json()

    if (!fromId || !toEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const toUser = await User.findOne({ email: toEmail });
    if (!toUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingInvite = await Invite.findOne({
      from: fromId,
      to: toUser._id,
      tripName,
    });
    if (existingInvite) {
      return NextResponse.json(
        { error: "Invite already sent" },
        { status: 409 }
      );
    }

    // ✅ Step 1: Block self-invites
    if (fromId === toUser._id.toString()) {
      return NextResponse.json(
        { error: "You cannot send a friend request to yourself." },
        { status: 400 }
      );
    }

    const invite = await Invite.create({ from: fromId, to: toUser._id });

    await User.findByIdAndUpdate(fromId, { $push: { invites: invite._id } });
    await User.findByIdAndUpdate(toUser._id, {
      $push: { invites: invite._id },
    });

    await invite.populate("from to");

    return NextResponse.json(invite, { status: 200 });
  } catch (error) {
    console.error("POST /api/users/invite error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
