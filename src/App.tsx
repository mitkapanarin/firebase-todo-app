import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage, Home, Signup, Login } from "./pages";
import Sidebar from "./components/Sidebar/Sidebar";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { loginFn, logoutFn } from "./store";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // @ts-ignore
        Cookies.set("accessToken", user?.accessToken);

        dispatch(loginFn({ userUid: uid }));
      } else {
        Cookies.remove("accessToken");
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
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
