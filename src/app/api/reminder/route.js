// app/api/send-reminder-emails/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // your MongoDB connection
import Trip from "@/models/tripModels"; // adjust path as needed
import User from "@/models/userModel"; // assuming Trip ref = User
import { Resend } from "resend";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    await connectDB();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(tomorrow.getDate() + 1); // start of day after tomorrow

    // Find trips happening tomorrow
    const trips = await Trip.find({
      date: {
        $gte: tomorrow,
        $lt: nextDay,
      },
    }).populate("user");

    const sendEmailPromises = trips.map(async (trip) => {
      if (!trip.user?.email) return;

      return resend.emails.send({
        from: "reminder@wanderlust.com",
        to: trip.user.email,
        subject: `Reminder: Your trip to ${trip.destination} is tomorrow!`,
        html: `<p>Hey ${trip.user.name || "there"},</p>
               <p>This is a reminder that your trip to <strong>${trip.destination}</strong> is scheduled for tomorrow.</p>
               <p>Safe travels! ✈️</p>
               <p>— Wanderlust Team</p>`,
      });
    });

    await Promise.all(sendEmailPromises);

    return NextResponse.json({
      message: "Reminder emails sent",
      count: trips.length,
    });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { error: "Failed to send reminder emails" },
      { status: 500 }
    );
  }
}
