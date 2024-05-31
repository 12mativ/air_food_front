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

const sortEventsByStartDate = (events: IEvent[]) => {
  return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
};

function findStudentById(students: IStudent[], id: string) {
  return students.find((student) => student.id === id);
}

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
      const { name, startDate, endDate, students, events } = action.payload;
      state.courses.forEach(course => {
        if (course.id === action.payload.id) {
          course.name = name;
          course.startDate = startDate;
          course.endDate = endDate;
          course.students = students;
          course.events = sortEventsByStartDate(events);
        }
      });
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
      const { name, startDate, endDate, coaches } = action.payload;
      state.courses.forEach((course) => {
        if (course.id === action.payload.courseId) {
          course.events = course.events.map(event => {
            if (event.id === action.payload.id) {
              return {
                ...event,
                name,
                startDate,
                endDate,
                coaches
              };
            }
            return event;
          });
          course.events = sortEventsByStartDate(course.events); 
        }
      });
    },
    addStudentToCourseRedux: (
      state,
      action: PayloadAction<{ student: IStudent; courseId: string }>
    ) => {
      const { student, courseId } = action.payload;
      const courseIndex = state.courses.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        const course = state.courses[courseIndex];
        if (!findStudentById(course.students, student.id)) {
          course.students.push(student);
        }
      }
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
  addEvent,
  addStudentToCourseRedux,
  updateCourse,
  updateEvent,
  removeStudentFromCourseRedux,
  removeCourseRedux
} = coursesSlice.actions;
