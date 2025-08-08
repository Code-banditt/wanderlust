import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/tripModels";
export const dynamic = "force-dynamic";

export async function PATCH(req, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    const AddStay = await Trip.findByIdAndUpdate(
      id,
      {
        $set: {
          stay: {
            name: body.places[0].name,
          },
        },
      },
      { new: true, runValidators: true }
    );

    console.log("incoming", AddStay);

    if (!AddStay) {
      return NextResponse.json({ message: "trip not found" }, { status: 404 });
    }
    return NextResponse.json(AddStay, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred", error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await connectDB();

    const DeleteHotel = await Trip.findByIdAndUpdate(
      id,
      {
        $unset: { stay: 1 },
      },
      { new: true }
    );

    if (!DeleteHotel) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json({ trip: updatedTrip }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error deleting hotel", error: err.message },
      { status: 500 }
    );
  }
}
