import { findEqualItemsById } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEvent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  courseId: string;
}

interface IEventsState {
  events: IEvent[];
}

const initialState: IEventsState = {
  events: [],
};

export const sortEventsByStartDate = (events: IEvent[]) => {
  return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    addEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<IEvent>) => {
      if (!findEqualItemsById(state.events, action.payload.id)) {
        state.events.push(action.payload);
      }
    },
    updateEvent: (state, action: PayloadAction<IEvent>) => {
      const { name, startDate, endDate } = action.payload;
      state.events.forEach(event => {
        if (event.id === action.payload.id) {
          event.name = name;
          event.startDate = startDate;
          event.endDate = endDate;
        }
      });
    },
    removeEvent: (state, action: PayloadAction<{eventId: string}>) => {
      state.events = state.events.filter(event => event.id !== action.payload.eventId);
    },
  },
});

export default eventsSlice.reducer;

export const {
  addEvents,
  addEvent,
  updateEvent,
  removeEvent
} = eventsSlice.actions;
