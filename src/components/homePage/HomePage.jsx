import React from "react";

import Header from "../header/Header";
import Body from "../body/Body";
import Footer from "../footer/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />

      <div id="name">
        <p id="namep">Name</p>
      </div>
      <div id="toponym-list" style={{ display: "none" }}></div>
      <Body />
      <Footer />
    </div>
  );
};

export default HomePage;
