import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICourse {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
}

interface ICoursesState {
  courses: ICourse[];
}

const initialState: ICoursesState = {
  courses: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {
    addCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
  },
});

export default coursesSlice.reducer;

export const { addCourses } = coursesSlice.actions;
