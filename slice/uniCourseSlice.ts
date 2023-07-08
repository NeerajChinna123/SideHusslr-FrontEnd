import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { universityDataType} from "../typings";

// Define a type for the slice state
interface universitiesCoursesDataState {
  uniCoursesData: Object;
}

// Define the initial state using that type
const initialState: universitiesCoursesDataState = {
    uniCoursesData: {},
};

export const universityCoursesDataSlice = createSlice({
  name: "uniCourseData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUniversitiesCoursesData: (state, action) => {
      state.uniCoursesData = action.payload;
    },
  },
});

export const { setUniversitiesCoursesData } = universityCoursesDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUniversitiesCoursesData = (state: RootState) =>
  state.uniCourseData.uniCoursesData;

export default universityCoursesDataSlice.reducer;
