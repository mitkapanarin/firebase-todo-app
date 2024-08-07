import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sysmtemSlice, resetSystem, themeSwitch } from "./Slices/systemSlice";
import { persistStore, persistReducer } from "redux-persist";
import { taskAPI } from "./API/taskAPI";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { userDataSlice, loginSuccess, logoutSuccess } from "./Slices/userSlice";

// API
import {
  userAuthAPI,
  useEmailLoginMutation,
  useEmailSignupMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useUpdateUserProfileMutation,
  useActivityLogsQuery,
  useGetProfileDataQuery,
} from "./API/userAuthAPI";

// Email API

import {
  gmailAPI,
  useGetAllEmailsQuery,
  useDeleteOneEmailMutation,
  useGetOneEmailQuery,
  useSendOneEmailMutation,
} from "./API/gmailAPI";

import { tokenSlice, clearToken, collectTokens } from "./Slices/tokenSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSystemReducer = persistReducer(
  persistConfig,
  sysmtemSlice.reducer,
);

const persistedUserReducer = persistReducer(
  persistConfig,
  userDataSlice.reducer,
);

const persistedTokenDataReducer = persistReducer(
  persistConfig,
  tokenSlice.reducer,
);

export const store = configureStore({
  reducer: {
    system: persistedSystemReducer,
    user: persistedUserReducer,
    tokenData: persistedTokenDataReducer,
    [userAuthAPI.reducerPath]: userAuthAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
    [gmailAPI.reducerPath]: gmailAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userAuthAPI.middleware, taskAPI.middleware, gmailAPI.middleware),
});

export const persistedStore = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export {
  // system actions
  resetSystem,
  themeSwitch,

  // user actions
  loginSuccess,
  logoutSuccess,

  // userAuthAPI
  useEmailLoginMutation,
  useEmailSignupMutation,
  useGoogleSignupMutation,
  useLogoutMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useUpdateUserProfileMutation,
  useActivityLogsQuery,
  useGetProfileDataQuery,

  // tokenSlice
  clearToken,
  collectTokens,

  // Gmail API
  useGetAllEmailsQuery,
  useDeleteOneEmailMutation,
  useGetOneEmailQuery,
  useSendOneEmailMutation,
};
