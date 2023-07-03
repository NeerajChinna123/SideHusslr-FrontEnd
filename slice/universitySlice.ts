import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { universityDataType } from "../typings";

// Define a type for the slice state
interface universitiesDataState {
  universitiesData: [];
}

// Define the initial state using that type
const initialState: universitiesDataState = {
  universitiesData: [],
};

export const universityDataSlice = createSlice({
  name: "universityData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUniversitiesData: (state, action) => {
      state.universitiesData = action.payload;
    },
  },
});

export const { setUniversitiesData } = universityDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUniversitiesData = (state: RootState) =>
  state.universityData.universitiesData;

export default universityDataSlice.reducer;
