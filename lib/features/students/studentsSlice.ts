import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITimes {
  day: string;
  time: { startTime: number, endTime: number }[];
}

export interface ISchedule {
  id: string;
  times: ITimes[];
  userId: string;
}

export interface ICourseForStudent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  creatorId: string;
}

export interface IStudent {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  userId: string;
  courses: ICourseForStudent[];
  schedule: ISchedule;
}

interface IStudentsState {
  students: IStudent[];
}

const initialState: IStudentsState = {
  students: [],
};

export const studentsSlice = createSlice({
  name: "students",
  initialState: initialState,
  reducers: {
    addStudents: (state, action: PayloadAction<IStudent[]>) => {
      state.students = action.payload;
    },
    addStudent: (state, action: PayloadAction<IStudent>) => {
      const existingStudent = state.students.find(student => student.id === action.payload.id);
      if (!existingStudent) {
        state.students.push(action.payload);
      }
    },
    updateStudent: (state, action: PayloadAction<IStudent>) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...action.payload };
      }
    },
    removeStudent: (state, action: PayloadAction<{ studentId: string }>) => {
      state.students = state.students.filter(student => student.id !== action.payload.studentId);
    },
    updateStudentSchedule: (state, action: PayloadAction<{ studentId: string, schedule: ISchedule }>) => {
      const { studentId, schedule } = action.payload;
      const studentIndex = state.students.findIndex(student => student.id === studentId);
      if (studentIndex !== -1) {
        state.students[studentIndex].schedule = schedule;
      }
    },
  },
});

export default studentsSlice.reducer;

export const { addStudents, addStudent, updateStudent, removeStudent, updateStudentSchedule } = studentsSlice.actions;