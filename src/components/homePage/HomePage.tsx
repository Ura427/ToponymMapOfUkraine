import React from "react";

import Header from "../header/Header.tsx";
import Body from "../body/Body.tsx";
import Footer from "../footer/Footer.tsx";


const HomePage = () => {

  return (
    <div>
      <Header/>

      <div id="name">
        <p id="namep">Name</p>
      </div>
      <Body /> 
      <Footer />
    </div>
  );
};

export default HomePage;
