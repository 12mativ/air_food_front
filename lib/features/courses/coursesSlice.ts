import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompetence } from "../competencies/competenciesSlice";

export interface IImprovingCompetence {
  id: string;
  improvingValue: number;
  competenceId: string;
  courseId: string;
  competence: ICompetence;
}

export interface ICourse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  creatorId: string;
  improvingCompetencies: IImprovingCompetence[];
  prerequisiteCompetencies: any[];
}

interface ICoursesState {
  courses: ICourse[];
  selectedCourse?: ICourse;
}

const initialState: ICoursesState = {
  courses: [],
  selectedCourse: undefined,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState: initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
    selectCourse: (state, action: PayloadAction<ICourse>) => {
      state.selectedCourse = action.payload;
    },
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
  removeCourseRedux,
  selectCourse,
  setCourses
} = coursesSlice.actions;
