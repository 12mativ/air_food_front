import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAllCoach {
  id: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userId: string;
}

interface IAllCoachesState {
  allCoaches: IAllCoach[];
}

const initialState: IAllCoachesState = {
  allCoaches: [],
};

export const allCoachesSlice = createSlice({
  name: "allCoaches",
  initialState: initialState,
  reducers: {
    addAllCoaches: (state, action: PayloadAction<IAllCoach[]>) => {
      state.allCoaches = action.payload;
    },
  },
});

export default allCoachesSlice.reducer;

export const { addAllCoaches } = allCoachesSlice.actions;