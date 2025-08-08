import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  tripName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Invite || mongoose.model("Invite", InviteSchema);
