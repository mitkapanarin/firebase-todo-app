import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserData {
  userUid: string;
  name: string;
  email: string;
  profileImage: string;
}

const initialState: IUserData = {
  userUid: "",
  name: "",
  email: "",
  profileImage: "",
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
