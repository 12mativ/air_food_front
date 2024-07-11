import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import studentsReducer from "./features/students/studentsSlice";
import allStudentsReducer from "./features/allStudents/allStudentsSlice";
import coursesReducer from "./features/courses/coursesSlice";
import coachesReducer from "./features/coaches/coachesSlice";
import eventsReducer from "./features/events/eventsSlice";
import allCoachesReducer from "./features/allCoaches/allCoachesSlice";
import simulatorsReducer from "./features/simulators/simulatorsSlice";
import compenciesReducer from "./features/competencies/competenciesSlice"

export const findEqualItemsById = (array: any, id: any) => {
  const equalItem = array.find((el: any) => el.id === id);
  if (equalItem) {
    return equalItem;
  } else return null;
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      studentsReducer,
      allStudentsReducer,
      coursesReducer,
      eventsReducer,
      coachesReducer,
      allCoachesReducer,
      simulatorsReducer,
      compenciesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
