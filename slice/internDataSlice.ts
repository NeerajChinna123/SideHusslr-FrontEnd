import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { usersDataType } from "../typings";

// Define a type for the slice state
interface internsRoleDataState {
    internsRoleData: any;
}

// Define the initial state using that type
const initialState: internsRoleDataState = {
  internsRoleData: [],
};

export const internsDataSlice = createSlice({
  name: "internRoleData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInternsRoleData: (state, action) => {
      state.internsRoleData = action.payload;
    },
  },
});

export const { setInternsRoleData } = internsDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInternsRoleData = (state: RootState) =>
  state.internRoleData.internsRoleData;

export default internsDataSlice.reducer;
