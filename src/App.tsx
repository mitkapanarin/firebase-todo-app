import { useEffect } from "react";
import {
  Home,
  Signup,
  Login,
  ResetPassword,
  ForgotPassword,
  ErrorPage,
  Pricing,
  UseCases,
  Contact,
  Tasks,
  DetailsPage,
  ProfilePage,
  ActivityLogs,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { loginSuccess, logoutSuccess } from "./store";
import {
  AuthenticationRoutes,
  ProtectedRoutes,
  DashboardProtectedRoutes,
} from "./pages/utils";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const photoURL = user.photoURL as string;
        const name = user.displayName as string;
        const email = user.email as string;
        dispatch(
          loginSuccess({
            uid,
            photoURL,
            name,
            email,
            emailVerified: false,
          }),
        );
      } else {
        dispatch(logoutSuccess());
      }
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticationRoutes />}>
          {/* General pages */}
          <Route path="/" element={<Home />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          {/* Authentication pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />
        </Route>

        <Route element={<DashboardProtectedRoutes />}>
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/details-page" element={<DetailsPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
