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
  },
});

export default studentsSlice.reducer;

export const { addStudents } = studentsSlice.actions;
