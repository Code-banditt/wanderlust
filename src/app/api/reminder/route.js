import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trip from "@/models/tripModels";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address
    pass: process.env.GMAIL_APP_PASS, // the 16-char App Password
  },
});

export async function GET() {
  try {
    await connectDB();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextDay = new Date(tomorrow);
    nextDay.setDate(tomorrow.getDate() + 1);

    // Find trips happening tomorrow
    const trips = await Trip.find({
      date: {
        $gte: tomorrow,
        $lt: nextDay,
      },
    }).populate("user");

    const sendEmailPromises = trips.map(async (trip) => {
      if (!trip.user?.email) return;

      const mailOptions = {
        from: `"Wanderlust" <${process.env.GMAIL_USER}>`,
        to: trip.user.email,
        subject: `Reminder: Your trip to ${trip.destination} is tomorrow!`,
        html: `
          <p>Hey ${trip.user.name || "there"},</p>
          <p>This is a reminder that your trip to <strong>${trip.destination}</strong> is scheduled for tomorrow.</p>
          <p>Safe travels! ✈️</p>
          <p>— Wanderlust Team</p>
        `,
      };

      return transporter.sendMail(mailOptions);
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
