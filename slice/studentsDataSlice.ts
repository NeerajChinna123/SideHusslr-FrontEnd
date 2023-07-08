import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { usersDataType } from "../typings";

// Define a type for the slice state
interface studentsRoleDataState {
    studentsRoleData: any;
}

// Define the initial state using that type
const initialState: studentsRoleDataState = {
  studentsRoleData: [],
};

export const studentsDataSlice = createSlice({
  name: "studentRoleData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStudentsRoleData: (state, action) => {
      state.studentsRoleData = action.payload;
    },
  },
});

export const { setStudentsRoleData } = studentsDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStudentsRoleData = (state: RootState) =>
  state.studentRoleData.studentsRoleData;

export default studentsDataSlice.reducer;
