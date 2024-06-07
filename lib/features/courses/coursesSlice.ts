import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICourse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  creatorId: string;
  improvingCompetencies: any[];
  prerequisiteCompetencies: any[];
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
    addCourse: (state, action: PayloadAction<ICourse>) => {
      if (!findEqualItemsById(state.courses, action.payload.id)) {
        state.courses.push(action.payload);
      }
    },
    updateCourse: (state, action: PayloadAction<ICourse>) => {
      const { name, startDate, endDate, } = action.payload;
      state.courses.forEach(course => {
        if (course.id === action.payload.id) {
          course.name = name;
          course.startDate = startDate;
          course.endDate = endDate;
        }
      });
    },
    removeCourseRedux: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.courses = state.courses.filter(course => course.id !== courseId);
    },
  },
});

export default coursesSlice.reducer;

export const {
  addCourse,
  addCourses,
  updateCourse,
  removeCourseRedux
} = coursesSlice.actions;
