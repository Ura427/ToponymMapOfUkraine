//Essential and hooks
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

//Styles
import "./Body.css";


//MUI
import BodySearch from "./BodySearch.jsx";
import BodyList from "./BodyList.jsx";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";


//Custom components
import SvgMap from "../../components/svgMap/SvgMap.jsx";
import ModalWindow from "../../components/modal/ModalWindow.jsx";

//Redux
// import { store } from "../../store/store.ts";
// import {
//   modalDescActions,
//   modalOpenActions,
//   modalStore,
//   modalTitleActions,
// } from "../../store/slices/modal.ts";
// import { avgRatingActions } from "../../store/slices/rating.ts";
// import { currRatingActions } from "../../store/slices/rating.ts";
// import { ratingStore } from "../../store/slices/rating.ts";
// import {
//   currDataStore,
//   currToponymActions,
// } from "../../store/slices/currData.ts";

//Context
import { RegionContext } from "../../store/context/regionContext.js";
import { ToponymContext } from "../../store/context/toponymContext.js";
import { ModalContext } from "../../store/context/modalContext.js";
import { ToponymsDataContext } from "../../store/context/toponymsDataContext.js";
import { BackendDataContext } from "../../store/context/backendDataContext.js";

//Component
const Body = () => {
  const [currRegion, setCurrRegion] = useState();
  const [currToponym, setCurrToponym] = useState();
  const [modalData, setModalData] = useState({
    open: false,
    title: null,
    desc: null
  });

  const [toponyms, setToponyms] = useState([]);
  const [notProvokeBySearch, setNotProvokeBySearch] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.value);

  const [backendData, setBackendData] = useState([]);
  const [toponymsData, setToponymsData] = useState([]);


  //Set Modal Data
  useEffect(() => {
    setModalData2();
    isLoggedIn && getAvgRating();
  },[currToponym, currRegion])


  function setModalData2 () {
    if (currToponym !== "") {
      const toponymDescription = getToponymDescription(currRegion, currToponym);
      setModalData((prevState) => ({
        ...prevState,
        title: currToponym,
        desc: toponymDescription
      }))
      // modalStore.dispatch(modalTitleActions.setTitle(currToponym));
      // modalStore.dispatch(modalDescActions.setDesc(toponymDescription));
    }
  }


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
  })


  //Gets average toponym rating
  function getAvgRating() {
    if (currToponym !== undefined) {
      axios
        .post("/rating/getAvgRating", { toponym: currToponym })
        .then((response) => {
          // setAvgRating((rating) => response.data.roundedAvgRating);

          // ratingStore.dispatch(
          //   avgRatingActions.setAvgRating(response.data.roundedAvgRating)
          // );
          console.log("Середню оцінку отримано");
        })
        .catch((error) => {
          if (error.message) {
            console.log("ПОмилка: " + error.message);
          }
          console.log("ПОмилка: " + error);
        });
    }
  }

  //Modal handlers
  function handleOpen() {
    // modalStore.dispatch(modalOpenActions.setActive());
    setModalData((prevState) => ({
      ...prevState,
      open: true
    }))
  }
  // function handleClose() {
  //   modalStore.dispatch(modalOpenActions.setDisabled());
  //   ratingStore.dispatch(currRatingActions.setCurrRating(0));
  // }

  // Database interactions
  function getToponymDescription(region, toponymName) {
    const toponym = toponymsData.find(
      (element) =>
        element.regionName === region && element.toponymName === toponymName
    );
    if (toponym) {
      return toponym.toponymDescription;
    }
    // Handle the case where the toponym is not found
    return "Toponym not found";
  }

  // //returns a list of toponyms of current region (SHOULD RETURN AN ARRAY OF OBJECTS)
  // function getInfo(region) {
  //   const toponyms = toponymsData.filter((element) => {
  //     return element.regionName === region;
  //   });
  //   setToponyms(toponyms);
  // }

  //Actions when toponym is clicked inside of a list
  function listItemClickHandler(toponym) {
    // currDataStore.dispatch(currToponymActions.setCurrToponym(toponym));
    setCurrToponym(toponym)
    handleOpen();
  }


  //Context
  const regionCtx = {
    value: currRegion,
    setValue: setCurrRegion
  }

  const toponymCtx = {
    value: currToponym,
    setValue: setCurrToponym
  }

  const modalCtx = {
    value: modalData,
    setValue: setModalData
  }

  const toponymsDataCtx = {
    value: toponymsData,
    setValue: setToponymsData
  }

  const backendDataContext = {
    value: backendData,
    setValue: setBackendData
  }

  return (
    <div id="page-body">
      <RegionContext.Provider value={regionCtx}>
       <ToponymContext.Provider value={toponymCtx}>
        <ToponymsDataContext.Provider value={toponymsDataCtx}>
        <ModalContext.Provider value={modalCtx}>
          <BackendDataContext.Provider value={backendDataContext}>
        

        
        <ModalWindow/>

        {currRegion !== "" && toponyms.length > 0 && notProvokeBySearch && (
          <BodyList
            toponyms={toponyms}
            listItemClickHandler={listItemClickHandler}
          />
        )}

        <div className="svg-container">
          <SvgMap
            height="650px"
            // getInfo={getInfo}
            toponymsData={toponymsData}
            setToponyms={setToponyms}
            setNotProvokeBySearch={setNotProvokeBySearch}
          />
        </div>
     
      

      <BodySearch
        sortedSearchOptions={toponymsData}
        handleOpen={handleOpen}
        setNotProvokeBySearch={setNotProvokeBySearch}
      />

      {isLoggedIn && (
        <Link to="/addToponym">
          <Fab
            sx={{ position: "absolute", right: "2rem", bottom: "6rem" }}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Link>
      )}


        </BackendDataContext.Provider>
        </ModalContext.Provider>
        </ToponymsDataContext.Provider>
      </ToponymContext.Provider> 
    </RegionContext.Provider>
    </div>
    
  );
};

export default Body;
