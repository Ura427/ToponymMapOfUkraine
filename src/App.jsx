import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import RegistrationPage from "./pages/registrationPage/RegistrationPage.jsx";
import AddToponymPage from "./pages/addToponymPage/AddToponymPage.jsx";

import { BackendDataContext } from "./store/context/backendDataContext.js";
import { ToponymsDataContext } from "./store/context/toponymsDataContext.js";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [toponymsData, setToponymsData] = useState([]);

  //fetch all backend data
  useEffect(() => {
    fetch("/api/getAll")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
    // backendDataTransform();
  }, []);

  useEffect(() => {
    if (backendData.length > 0) {
      const allToponyms = backendData.flatMap((region) => {
        return region.toponyms.map((toponym) => ({
          regionName: region.name,
          toponymName: toponym.name,
          toponymDescription: toponym.description,
        }));
      });

      setToponymsData(
        allToponyms.sort((a, b) => {
          if (a.regionName === b.regionName) {
            return a.toponymName.localeCompare(b.toponymName);
          } else {
            return a.regionName.localeCompare(b.regionName);
          }
        })
      );
    }
  }, [backendData]);

  const toponymsDataCtx = {
    value: toponymsData,
    setValue: setToponymsData,
  };

  const backendDataCtx = {
    value: backendData,
    setValue: setBackendData,
  };

  return (
    <div>
      <BackendDataContext.Provider value={backendDataCtx}>
        <ToponymsDataContext.Provider value={toponymsDataCtx}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/addToponym" element={<AddToponymPage />} />
          </Routes>
        </ToponymsDataContext.Provider>
      </BackendDataContext.Provider>
    </div>
  );
}

export default App;
