//Add rubic font

import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import Profilepage from "./pages/profilePage/Profilepage";
import { useSelector } from "react-redux";
import { InitialState } from "./ReduxContext/context";
import Navbar from "./pages/navbar/Navbar";

type stateType = {
  auth: InitialState;
};

function App() {
  const { token } = useSelector((state: stateType) => state.auth);

  const isAuth = token;

  return (
    <div className="mt-[58px]">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <Profilepage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
