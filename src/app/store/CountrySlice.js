import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//fetch country info
export const fetchCountryInfo = createAsyncThunk(
  "country/fetchCountryInfo",
  async (name, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/countries/${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("❌ FetchCountryInfo error:", err);
      return rejectWithValue("Failed to fetch country info");
    }
  }
);

const Infoslice = createSlice({
  name: "country",
  initialState: {
    countryinfo: {},
    selectedCountry: null,
    status: "idle",
  },

  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountryInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countryinfo = action.payload;
      })
      .addCase(fetchCountryInfo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

//exports

export const { setSelectedCountry } = Infoslice.actions;
export default Infoslice.reducer;
