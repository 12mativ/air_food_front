import { RolesType } from "@/http/user/userAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  roles: RolesType[];
  isAuth: boolean;
}

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {
    email: "",
    roles: [],
    isAuth: false,
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    makeAuth: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});


export default userSlice.reducer;

export const { makeAuth } = userSlice.actions;