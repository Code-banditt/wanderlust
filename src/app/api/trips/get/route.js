import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/tripModels";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions); // ✅ no req/res needed

  if (!session || !session.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const userId = session.user.id;
    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: trips });
  } catch (error) {
    console.error("Trip fetch failed:", error);
    return NextResponse.json({ error: "Trip fetch failed" }, { status: 500 });
  }
}
