import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudent } from "../students/studentsSlice";
import { ICoach } from "../coaches/coachesSlice";

export interface IEvent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  courseId: string;
  coaches: ICoach[]
}

export interface ICourse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  creatorId: string;
  students: IStudent[];
  improvingCompetencies: any[];
  events: IEvent[];
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
      const {name, startDate, endDate, students, events} = action.payload;
      state.courses.forEach(course => {
        if (course.id === action.payload.id) {
          course.name = name
          course.startDate = startDate
          course.endDate = endDate
          course.endDate = endDate
          course.students = students
          course.events = events
        }
      })
    },
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.courses.forEach((course) => {
        if (course.id === action.payload.courseId) {
          if (!findEqualItemsById(course.events, action.payload.id)) {
            course.events.push(action.payload);
          }
        }
      });
    },
    updateEvent: (state, action: PayloadAction<IEvent>) => {
      const {name, startDate, endDate, coaches} = action.payload;
      state.courses.forEach((course) => {
        if (course.id === action.payload.courseId) {
          course.events.forEach(event => {
            if (event.id === action.payload.id) {
              event.name = name
              event.startDate = startDate
              event.endDate = endDate
              event.coaches = coaches
            }
          })
        }
      });
    },
    addStudentToCourseRedux: (
      state,
      action: PayloadAction<IStudent & { courseId: string }>
    ) => {
      state.courses.forEach((course) => {
        if (course.id === action.payload.courseId) {
          if (!findEqualItemsById(course.students, action.payload.id)) {
            course.students.push(action.payload);
          }
        }
      });
    },
    removeStudentFromCourseRedux: (state, action) => {
      const { studentId, courseId } = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);

      if (courseIndex !== -1) {
        state.courses[courseIndex].students = state.courses[courseIndex].students.filter(
          student => student.id !== studentId
        );
      }
    },
  },
});

export default coursesSlice.reducer;

export const {
  addCourse,
  addCourses,
  addEvent,
  addStudentToCourseRedux,
  updateCourse,
  updateEvent,
  removeStudentFromCourseRedux
} = coursesSlice.actions;
