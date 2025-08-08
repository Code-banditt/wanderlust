// app/api/trips/delete-all/route.js
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/tripModels";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

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
