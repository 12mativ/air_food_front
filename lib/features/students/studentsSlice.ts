import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findEqualItemsById } from "../../store";
import { IStudentCompetenceCharacteristic } from "../competencies/competenciesSlice";

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
  competencies: IStudentCompetenceCharacteristic[]
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
      state.students.forEach((student) => {
        if (student.id === action.payload.id) {
          const { firstName, lastName, middleName, birthDate, competencies } = action.payload;
          student.firstName = firstName;
          student.lastName = lastName;
          student.middleName = middleName;
          student.birthDate = birthDate;
          student.competencies = competencies;
        }
      });
    },
    updateStudentSchedule: (state, action: PayloadAction<{ studentId: string, schedule: ISchedule }>) => {
      const { studentId, schedule } = action.payload;
      const studentIndex = state.students.findIndex(student => student.id === studentId);
      if (studentIndex !== -1) {
        state.students[studentIndex].schedule = schedule;
      }
    },
    addStudentCompetence: (state, action: PayloadAction<IStudentCompetenceCharacteristic>) => {
      state.students.forEach((student) => {
        if (student.id === action.payload.studentId) {
          if (!findEqualItemsById(student.competencies, action.payload.competenceId)) {
            student.competencies.push(action.payload)
          }
        }
      })
    },
    removeStudentCompetence: (state, action: PayloadAction<{ competenceId: string, studentId: string }>) => {
      state.students.forEach((student) => {
        if (student.id === action.payload.studentId) {
          student.competencies = student.competencies.filter(c => c.id !== action.payload.competenceId)
        }
      })
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

export const { addStudents, addStudent, updateStudent, removeStudent, addStudentCompetence, removeStudentCompetence, updateStudentSchedule } = studentsSlice.actions;
