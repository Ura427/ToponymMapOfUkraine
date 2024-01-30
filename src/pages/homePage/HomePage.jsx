import React from "react";

import Header from "../../components/header/Header"
import Body from "../homePage/Body";
import Footer from "../../components/footer/Footer";


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
