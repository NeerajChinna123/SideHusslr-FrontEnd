import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "../slice/usersSlice";
import universityReducer from "../slice/universitySlice";
import studentReducer from "../slice/studentSlice";
import uniCoursesReducer from "../slice/uniCourseSlice";
import courseDetailReducer from "../slice/courseDetailsSlice";



export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    universityData:universityReducer,
    studentData:studentReducer,
    uniCourseData:uniCoursesReducer,
    courseDetailData:courseDetailReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
