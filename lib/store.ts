import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./features/flights/flightsSlice";
import userReducer from "./features/user/userSlice";
import studentsReducer from "./features/students/studentsSlice";

export const findEqualItemsById = (array: any, id: any) => {
  const equalItem = array.find((el: any) => el.id === id);
  if (equalItem) {
    return equalItem;
  } else return null;
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      flightsReducer,
      userReducer,
      studentsReducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
