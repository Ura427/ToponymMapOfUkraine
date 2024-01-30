import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage.jsx"
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegistrationPage from "./pages/registrationPage/RegistrationPage.jsx"
import AddToponymPage from "./pages/addToponymPage/AddToponymPage.jsx"




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/addToponym" element={<AddToponymPage />} />
      </Routes>
    </div>
  );
}

export default App;
