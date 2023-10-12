import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage, Home, Signup, Login, ProfilePage } from "./pages";
import Sidebar from "./components/Sidebar/Sidebar";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { loginFn, logoutFn } from "./store";
// import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const uid = user.uid;
        const profileImage = user.photoURL as string;
        const name = user.displayName as string;
        const email = user.email as string;
        // @ts-ignore
        // Cookies.set("accessToken", user?.accessToken);

        dispatch(loginFn({ userUid: uid, profileImage, name, email }));
      } else {
        // Cookies.remove("accessToken");
        dispatch(logoutFn());
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
