import { findEqualItemsById } from './../../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStudent {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  userId: string;
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
    updateStudent: (state, action: PayloadAction<IStudent>) => {
      state.students.forEach((student) => {
        if (student.id === action.payload.id) {
          const {firstName, lastName, middleName, birthDate} = action.payload
          student.firstName = firstName
          student.lastName = lastName
          student.middleName = middleName
          student.birthDate = birthDate
        }
      })
    },
  },
});

export default studentsSlice.reducer;

export const { addStudents, updateStudent } = studentsSlice.actions;
