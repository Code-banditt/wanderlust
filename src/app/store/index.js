// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import continentReducer from "./ContinentSlice";
import countryReducer from "./CountrySlice";
import tripReducer from "./tripSlice";

const store = configureStore({
  reducer: {
    continent: continentReducer,
    country: countryReducer,
    trip: tripReducer,
  },
});

export default store;
