import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { studentDataType } from "../typings";

// Define a type for the slice state
interface studentsDataState {
  studentsData: [];
}

// Define the initial state using that type
const initialState: studentsDataState = {
  studentsData: [],
};

export const studentDataSlice = createSlice({
  name: "studentData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStudentsData: (state, action) => {
      state.studentsData = action.payload;
    },
  },
});

export const { setStudentsData } = studentDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStudentsData = (state: RootState) =>
  state.studentData.studentsData;

export default studentDataSlice.reducer;
