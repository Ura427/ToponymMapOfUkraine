import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import HomePage from "./components/homePage/HomePage";

function App() {

  return (
    <div>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
