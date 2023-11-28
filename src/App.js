import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import HomePage from "./components/homePage/HomePage";
import AddToponym from "./components/addToponym/AddToponym";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState();

  return (
    <div>
    
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currUser={currUser} setCurrUser={setCurrUser} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrUser={setCurrUser}/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addToponym" element={ <AddToponym />} />
      </Routes>
    </div>
  );
}

export default App;
