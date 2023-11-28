import React, { useState } from "react";

import Header from "../header/Header";
import Body from "../body/Body";
import Footer from "../footer/Footer";

const HomePage = ({ isLoggedIn, setIsLoggedIn, currUser, setCurrUser }) => {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currUser={currUser} setCurrUser={setCurrUser} />

      <div id="name">
        <p id="namep">Name</p>
      </div>
      <div id="toponym-list" style={{ display: "none" }}></div>
      <Body isLoggedIn={isLoggedIn} currUser={currUser}/>
      <Footer />
    </div>
  );
};

export default HomePage;
