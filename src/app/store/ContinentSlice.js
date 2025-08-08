// store/continentSlice.js
// features/countries/countriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//fetch continent countries
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const res = await fetch("/api/countries/all");
    const data = await res.json();
    return data; // { Europe: [...], Asia: [...], etc. }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countriesByContinent: {},
    selectedContinent: null,
    status: "idle",
  },
  reducers: {
    setSelectedContinent: (state, action) => {
      state.selectedContinent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countriesByContinent = action.payload;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSelectedContinent } = countriesSlice.actions;
export default countriesSlice.reducer;
