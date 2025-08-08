import { connectDB } from "@/lib/mongodb";
import Invite from "@/models/inviteModel";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { inviteId } = await req.json();

    const invite = await Invite.findById(inviteId);
    if (!invite)
      return NextResponse.json({ error: "Invite not found" }, { status: 404 });

    // ✅ Update invite status to "rejected"
    await Invite.findByIdAndUpdate(inviteId, { status: "rejected" });

    await Invite.findByIdAndDelete(inviteId);

    return NextResponse.json(
      { message: "Invite rejected successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
