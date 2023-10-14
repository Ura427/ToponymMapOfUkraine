import React from "react";

import Header from "../../components/header/Header";
import Body from "../../components/body/Body";
import Footer from "../../components/footer/Footer";

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
