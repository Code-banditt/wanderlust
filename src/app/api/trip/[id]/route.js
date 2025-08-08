import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/tripModels";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";

export async function DELETE(req, { params }) {
  const { id } = await params;
  const { placeName } = await req.json();

  await connectDB();

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      { $pull: { places: { name: placeName } } },
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ trip: updatedTrip }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/trips/[id]/places failed", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// app/api/trips/[id]/budget/route.js

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { budget } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      { userBudget: budget },
      { new: true }
    );

    if (!updatedTrip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTrip, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
