import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth, googleProvider } from "../../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { IUserData } from "../../types/interface";

export const UserAuthAPI = createApi({
  reducerPath: "UserAuthAPI",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "UpdateUser"],
  endpoints: (builder) => ({
    emailSignup: builder.mutation<UserCredential, IUserData>({
      queryFn: async (user: IUserData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    emailLogin: builder.mutation<UserCredential, IUserData>({
      queryFn: async (user: IUserData) => {
        try {
          const { email, password } = user;
          const response: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    googleSignup: builder.mutation<UserCredential, null>({
      queryFn: async () => {
        try {
          const response = await signInWithPopup(auth, googleProvider);
          return {
            data: response,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    sendResetPassWordEmail: builder.mutation<
      string,
      {
        email: string;
      }
    >({
      queryFn: async ({ email }) => {
        try {
          await sendPasswordResetEmail(auth, email, {
            url: "http://localhost:5173/login",
          });
          return {
            data: "Password reset link sent to your email",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    setNewPassWord: builder.mutation<
      string,
      {
        oobCode: string;
        password: string;
      }
    >({
      queryFn: async ({ oobCode, password }) => {
        await confirmPasswordReset(auth, oobCode, password);
        try {
          return {
            data: "Successfully reset Password",
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<void, null>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return {
            data: undefined,
          };
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    sendEmailVerification: builder.mutation<string, object>({
      queryFn: async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            await sendEmailVerification(user, {
              url: "http://localhost:5173/login",
            });
            return {
              data: "Email verification link sent to your email",
            };
          } else {
            return {
              error: "No user found. Please log in.",
            };
          }
        } catch (err) {
          return {
            error: (err as Error)?.message,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
    // make another endpoint for updating user data
  }),
});

export const {
  useEmailSignupMutation,
  useEmailLoginMutation,
  useGoogleSignupMutation,
  useSendResetPassWordEmailMutation,
  useSetNewPassWordMutation,
  useLogoutMutation,
  useSendEmailVerificationMutation,
} = UserAuthAPI;
