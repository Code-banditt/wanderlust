import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    destination: {
      name: { type: String, required: true },
    },
    flight: {
      airline: { type: String },
      from: { type: String },
      to: { type: String },
      price: { type: Number },
    },
    stay: {
      name: { type: String },
      location: { type: String },
      price: { type: Number },
      image: { type: String },
    },
    friends: {
      name: { type: String },
      amount: { type: Number },
    },

    places: [
      {
        name: { type: String, required: true },
        image: { type: String },
      },
    ],

    totalCost: { type: Number },
    userBudget: { type: Number },

    date: {
      startDate: { type: Number, required: true },
      endDate: { type: Number, required: true },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

TripSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id; // optional: add `id` field
    delete ret._id; // optional: remove `_id` if you prefer using `id`
  },
});

export default mongoose.models.Trip || mongoose.model("Trip", TripSchema);
