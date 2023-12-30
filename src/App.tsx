import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/login/Login.tsx";
import Registration from "./components/registration/Registration";
import HomePage from "./components/homePage/HomePage.tsx";
import AddToponym from "./components/addToponym/AddToponym";




function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addToponym" element={<AddToponym />} />
      </Routes>
    </div>
  );
}

export default App;
