import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import HomePage from "./pages/homePage/HomePage";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [allToponyms, setAllToponyms] = React.useState([]);

  useEffect(() => {
    fetch("/api/getAll")
      .then((response) => response.json()) 
      .then((data) => {
        setBackendData(data);
      });
  }, []);


  //   setAllToponyms( backendData.map(region => ({
  //   regionName: region.name,
  //   toponyms: region.toponyms.map(toponym => toponym.name)
  // })))


  //   console.log(allToponyms);
  return (
    <div>

      {backendData.map( data => {
        return <p>{JSON.stringify(data)}</p>
      })}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
