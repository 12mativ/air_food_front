import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISimulator {
  id: string;
  name: string;
}

interface ISimulatorsState {
  simulators: ISimulator[];
}

const initialState: ISimulatorsState = {
  simulators: [],
};

export const simulatorsSlice = createSlice({
  name: "simulators",
  initialState: initialState,
  reducers: {
    addSimulators: (state, action: PayloadAction<ISimulator[]>) => {
      state.simulators = action.payload;
    },
    addSimulator: (state, action: PayloadAction<ISimulator>) => {
      if (!findEqualItemsById(state.simulators, action.payload.id)) {
        state.simulators.push(action.payload);
      }
    },
    updateSimulator: (state, action: PayloadAction<ISimulator>) => {
      const { name } = action.payload;
      state.simulators.forEach(simulator => {
        if (simulator.id === action.payload.id) {
          simulator.name = name;
        }
      });
    },
    removeSimulatorRedux: (state, action: PayloadAction<string>) => {
      const simulatorId = action.payload;
      state.simulators = state.simulators.filter(simulator => simulator.id !== simulatorId);
    },
  },
});

export default simulatorsSlice.reducer;

export const {
  addSimulator,
  addSimulators,
  updateSimulator,
  removeSimulatorRedux
} = simulatorsSlice.actions;
