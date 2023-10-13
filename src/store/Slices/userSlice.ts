import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserData {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
}

const initialState: IUserData = {
  uid: "",
  name: "",
  email: "",
  photoURL: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginFn: (state: IUserData, action: PayloadAction<IUserData>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutFn: () => initialState,
  },
});

export const { loginFn, logoutFn } = userSlice.actions;
