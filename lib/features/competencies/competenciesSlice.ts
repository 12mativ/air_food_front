import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICompetence {
  id: string;
  name: string;
}

export interface IStudentCompetenceCharacteristic {
  id: string
  scaleValue: number;
  competenceId: string;
  studentId: string;
  competence: ICompetence
}

export interface ICompetenciesState{
  competencies: ICompetence [];
}

const initialState: ICompetenciesState = {
  competencies: [],
};

export const competenciesSlice = createSlice({
  name: "competencies",
  initialState: initialState,
  reducers: {
    addCompetencies: (state, action: PayloadAction<ICompetence[]>) => {
      state.competencies = action.payload;
    },
    addCompetence: (state, action: PayloadAction<ICompetence>) => {
      if (!findEqualItemsById(state.competencies, action.payload.id)) {
        state.competencies.push(action.payload);
      }
    },
    updateCompetence: (state, action: PayloadAction<ICompetence>) => {
      const { name } = action.payload;
      state.competencies.forEach(competence => {
        if (competence.id === action.payload.id) {
          competence.name = name;
        }
      });
    },
    removeCompetenceRedux: (state, action: PayloadAction<string>) => {
      const competenceId = action.payload;
      state.competencies = state.competencies.filter(competence => competence.id !== competenceId);
    },
  },
});

export default competenciesSlice.reducer;

export const {
  addCompetence,
  addCompetencies,
  updateCompetence,
  removeCompetenceRedux
} = competenciesSlice.actions;

