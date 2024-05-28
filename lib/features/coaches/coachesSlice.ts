import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from '../courses/coursesSlise';

export interface ICoach {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  userId: string;
  events: IEvent[]
}

interface ICoachesState {
  coaches: ICoach[];
}

const initialState: ICoachesState = {
  coaches: [],
};

export const coachesSlice = createSlice({
  name: "coaches",
  initialState: initialState,
  reducers: {
    addCoaches: (state, action: PayloadAction<ICoach[]>) => {
      state.coaches = action.payload;
    },
    updateCoach: (state, action: PayloadAction<ICoach>) => {
      state.coaches.forEach((coach) => {
        if (coach.id === action.payload.id) {
          const { firstName, lastName, middleName, birthDate } = action.payload;
          coach.firstName = firstName;
          coach.lastName = lastName;
          coach.middleName = middleName;
          coach.birthDate = birthDate;
        }
      });
    },
  },
});

export default coachesSlice.reducer;

export const { addCoaches, updateCoach } = coachesSlice.actions;
