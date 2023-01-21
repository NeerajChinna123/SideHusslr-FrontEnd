import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "../slice/usersSlice";
import universityReducer from "../slice/universitySlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    universityData:universityReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
