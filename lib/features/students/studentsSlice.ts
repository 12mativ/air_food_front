import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findEqualItemsById } from "../../store";

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
  courses: ICourseForStudent[]
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
      if (!findEqualItemsById(state.students, action.payload.id)) {
        state.students.push(action.payload);
      }
    },
    updateStudent: (state, action: PayloadAction<IStudent>) => {
      state.students.forEach((student) => {
        if (student.id === action.payload.id) {
          const { firstName, lastName, middleName, birthDate } = action.payload;
          student.firstName = firstName;
          student.lastName = lastName;
          student.middleName = middleName;
          student.birthDate = birthDate;
        }
      });
    },
    removeStudent: (state, action: PayloadAction<{studentId: string}>) => {
      state.students = state.students.filter(s => s.id !== action.payload.studentId)
      // const index = state.students.findIndex(
      //   (student) => student.id === action.payload
      // );
      // if (index !== -1) {
      //   state.students.splice(index, 1);
      // }
    },
  },
});

export default studentsSlice.reducer;

export const { addStudents, addStudent, updateStudent, removeStudent } = studentsSlice.actions;
