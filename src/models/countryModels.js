import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    population: {
      type: Number,
    },
    cities: [
      {
        name: String,
        image: String, // city image URL
      },
    ],
    hotels: [
      {
        name: String,
        rating: Number,
        pricePerNight: Number,
        location: String,
        image: String,
      },
    ],
    attractions: [
      {
        name: String,
        about: String,
        images: String,
      },
    ],
    securityIndex: {
      type: Number, // e.g., 1 to 100
    },
    information: {
      type: String, // e.g., travel advisories or general info
    },
    location: {
      lat: Number,
      lng: Number,
    },

    images: [String], // multiple country photos
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Country ||
  mongoose.model("Country", CountrySchema);
