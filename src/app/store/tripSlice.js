import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createTrip = createAsyncThunk(
  "trip/createTrip",
  async (tripData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/trips/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });

      const raw = await res.text();
      console.log("🧪 Raw Response:", raw);

      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error("❌ Failed to parse JSON:", err);
        return rejectWithValue("Server returned invalid JSON");
      }

      if (!res.ok || !data?.trip) {
        return rejectWithValue(data?.message || "Failed to create trip");
      }

      return data.trip;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create trip");
    }
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    currentTrip: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTrip = action.payload;
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tripSlice.reducer;
