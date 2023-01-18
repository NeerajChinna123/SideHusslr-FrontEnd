import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { usersDataType } from "../typings";

// Define a type for the slice state
interface usersDataState {
  usersData: [];
}

// Define the initial state using that type
const initialState: usersDataState = {
  usersData: [],
};

export const userDataSlice = createSlice({
  name: "userData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      state.usersData = action.payload;
    },
  },
});

export const { setUsersData } = userDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsersData = (state: RootState) => state.userData.usersData;

export default userDataSlice.reducer;
