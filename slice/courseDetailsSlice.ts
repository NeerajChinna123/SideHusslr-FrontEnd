import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { courseAssignmentUsersType} from "../typings";

// Define a type for the slice state
interface courseDetailsState {
  courseDetailsData: any;
}

// Define the initial state using that type
const initialState: courseDetailsState = {
    courseDetailsData: {},
};

export const courseDetailsSlice = createSlice({
  name: "courseDetailData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCourseDetailsData: (state, action) => {
      state.courseDetailsData = action.payload;
    },
  },
});

export const { setCourseDetailsData } = courseDetailsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCourseDetailsData = (state: RootState) =>
  state.courseDetailData.courseDetailsData;

export default courseDetailsSlice.reducer;
