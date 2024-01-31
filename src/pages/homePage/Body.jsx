//Essential and hooks
import React, { useContext, useEffect, useState } from "react";
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


//Context
import { RegionContext } from "../../store/context/regionContext.js";
import { ToponymContext } from "../../store/context/toponymContext.js";
import { ModalContext } from "../../store/context/modalContext.js";
import { ToponymsDataContext } from "../../store/context/toponymsDataContext.js";
import { BackendDataContext } from "../../store/context/backendDataContext.js";

//Component
const Body = () => {
  const backendData = useContext(BackendDataContext);
  const toponymsData = useContext(ToponymsDataContext)
  
  console.log(backendData.value)
  console.log(toponymsData.value)

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
    }
  }




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
    setModalData((prevState) => ({
      ...prevState,
      open: true
    }))
  }


  // Database interactions
  function getToponymDescription(region, toponymName) {
    const toponym = toponymsData.value.find(
      (element) =>
        element.regionName === region && element.toponymName === toponymName
    );
    if (toponym) {
      return toponym.toponymDescription;
    }
    // Handle the case where the toponym is not found
    return "Toponym not found";
  }



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


  return (
    <div id="page-body">
      <RegionContext.Provider value={regionCtx}>
       <ToponymContext.Provider value={toponymCtx}>
        <ModalContext.Provider value={modalCtx}>
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
            toponymsData={toponymsData}
            setToponyms={setToponyms}
            setNotProvokeBySearch={setNotProvokeBySearch}
          />
        </div>
     
      

      <BodySearch
        sortedSearchOptions={toponymsData.value}
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


        </ModalContext.Provider>
      </ToponymContext.Provider> 
    </RegionContext.Provider>
    </div>
    
  );
};

export default Body;
