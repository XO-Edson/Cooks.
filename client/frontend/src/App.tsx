//Add rubic font

import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import Profilepage from "./pages/profilePage/Profilepage";
import { useSelector } from "react-redux";
import { InitialState } from "./ReduxContext/context";
import Navbar from "./pages/navbar/Navbar";

function App() {
  const { user, posts, token, mode } = useSelector(
    (state: InitialState) => state
  );

  console.log(user, posts, token, mode);

  return (
    <div className="mt-[8%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<Profilepage />} />
      </Routes>
    </div>
  );
}

export default App;
