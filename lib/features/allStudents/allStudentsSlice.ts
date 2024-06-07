import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseForStudent } from "../students/studentsSlice";

interface IAllStudent {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  userId: string;
  courses: ICourseForStudent[]
}

interface IAllStudentsState {
  allStudents: IAllStudent[];
}

const initialState: IAllStudentsState = {
  allStudents: [],
};

export const allStudentsSlice = createSlice({
  name: "allStudents",
  initialState: initialState,
  reducers: {
    addAllStudents: (state, action: PayloadAction<IAllStudent[]>) => {
      state.allStudents = action.payload;
    },
  },
});

export default allStudentsSlice.reducer;

export const { addAllStudents } = allStudentsSlice.actions;
