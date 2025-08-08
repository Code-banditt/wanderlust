import { NextResponse } from "next/server";
import Trip from "@/models/tripModels";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  await connectDB();

  try {
    const body = await req.json();

    const newTrip = await Trip.create({
      destination: body.destination,
      date: body.date,
      userBudget: body.userBudget,
      places: [],
      user: userId,
    });

    return NextResponse.json({ trip: newTrip }, { status: 201 });
  } catch (err) {
    console.error("❌ Trip creation error:", err);
    return NextResponse.json(
      { message: "Failed to create trip" },
      { status: 500 }
    );
  }
}
