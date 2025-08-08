// src/app/api/trips/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/tripModels";
export const dynamic = "force-dynamic";

// fetch trip details by ID
export async function GET(req, { params }) {
  const { id } = await params;

  await connectDB();

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ trip }, { status: 200 });
  } catch (error) {
    console.error("GET /api/trips/[id] failed", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//edit trip details by ID
export async function PATCH(req, { params }) {
  const { id } = await params;
  await connectDB();

  try {
    const body = await req.json();

    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      {
        $push: {
          places: { name: body.places[0].name, image: body.places[0].image },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ trip: updatedTrip }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/trips/[id] failed", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// delete trip by ID

export async function DELETE(req, { params }) {
  const { id } = await params;
  await connectDB();

  try {
    const deletedTrip = await Trip.findByIdAndDelete(id);

    if (!deletedTrip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Trip deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/trips/[id] failed", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
