import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findEqualItemsById } from "../../store";

export interface ICoach {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userId: string;
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
    addCoach: (state, action: PayloadAction<ICoach>) => {
      if (!findEqualItemsById(state.coaches, action.payload.id)) {
        state.coaches.push(action.payload);
      }
    },
    updateCoach: (state, action: PayloadAction<ICoach>) => {
      state.coaches.forEach((coach) => {
        if (coach.id === action.payload.id) {
          const { firstName, lastName, middleName } = action.payload;
          coach.firstName = firstName;
          coach.lastName = lastName;
          coach.middleName = middleName;
        }
      });
    },
  },
});

export default coachesSlice.reducer;

export const { addCoaches, addCoach, updateCoach } = coachesSlice.actions;
