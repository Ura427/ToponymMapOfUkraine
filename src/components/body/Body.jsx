import React, { createContext, useContext, useEffect, useState } from "react";
import "./Body.css";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BodySearch from "../body-search/BodySearch.jsx";
import BodyList from "../body-list/BodyList.jsx";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";

import { Link } from "react-router-dom";
import SvgMap from "../svgMap/SvgMap.jsx";

import { store } from "../../store/store.ts";
import { useSelector } from "react-redux";

import {
  modalDescActions,
  modalOpenActions,
  modalStore,
  modalTitleActions,
} from "../../store/slices/modal.ts";

import ModalWindow from "../modal/ModalWindow.tsx";

import { avgRatingActions } from "../../store/slices/rating.ts";
import { currRatingActions } from "../../store/slices/rating.ts";

import { ratingStore } from "../../store/slices/rating.ts";
import {
  currDataStore,
  currToponymActions,
} from "../../store/slices/currData.ts";



import { RegionContext } from "../../store/context/regionContext.js";

//Component
const Body = () => {
  const [currRegion, setCurrRegion] = useState();

  // const [toponyms, setToponyms] = useState<Array<Toponym>>([]);
  const [toponyms, setToponyms] = useState([]);

  // const [notProvokeBySearch, setNotProvokeBySearch] = useState<boolean>(true);
  const [notProvokeBySearch, setNotProvokeBySearch] = useState(true);

  // type RootState = ReturnType<typeof appStore.getState>;

  const isLoggedIn = useSelector((state) => state.auth.value);

  const currToponym = useSelector((state) => state.currToponym);

  console.log("currRegion: " + currRegion);
  console.log("toponyms: " + JSON.stringify(toponyms));

  //useEffect for Modal window
  useEffect(() => {
    if (currToponym !== "") {
      const toponymDescription = getToponymDescription(currRegion, currToponym);
      modalStore.dispatch(modalTitleActions.setTitle(currToponym));
      modalStore.dispatch(modalDescActions.setDesc(toponymDescription));
    }
  }, [currToponym, currRegion]);

  //Cut from BodySearch
  // const [backendData, setBackendData] = useState<Array<any>>([]);
  // const [toponymsData, setToponymsData] = useState<Array<any>>([]);

  const [backendData, setBackendData] = useState([]);
  const [toponymsData, setToponymsData] = useState([]);

  //fetch all backend data
  useEffect(() => {
    fetch("/api/getAll")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  // type Toponym = {
  //   name: string;
  //   description: string;
  // };

  // type Region = {
  //   id: string;
  //   region: string;
  //   toponyms: Toponym[];
  // };

  //transforms backend data
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

  useEffect(() => {
    if (currToponym !== undefined) {
      axios
        .post("/rating/getAvgRating", { toponym: currToponym })
        .then((response) => {
          // setAvgRating((rating) => response.data.roundedAvgRating);
          ratingStore.dispatch(
            avgRatingActions.setAvgRating(response.data.roundedAvgRating)
          );
          console.log("Середню оцінку отримано");
        })
        .catch((error) => {
          if (error.message) {
            console.log("ПОмилка: " + error.message);
          }
          console.log("ПОмилка: " + error);
        });
    }
  });

  //Modal handlers
  function handleOpen() {
    // setOpen(true);
    modalStore.dispatch(modalOpenActions.setActive());
  }
  function handleClose() {
    // setOpen(false);
    modalStore.dispatch(modalOpenActions.setDisabled());
    // setCurrRating(0);
    ratingStore.dispatch(currRatingActions.setCurrRating(0));
  }

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

  //returns a list of toponyms of current region (SHOULD RETURN AN ARRAY OF OBJECTS)
  function getInfo(region) {
    const toponyms = toponymsData.filter((element) => {
      return element.regionName === region;
    });
    setToponyms(toponyms);
  }

  function listItemClickHandler(toponym) {
    // setCurrToponym(toponym);
    currDataStore.dispatch(currToponymActions.setCurrToponym(toponym));
    handleOpen();
  }


  const regionCtx = {
    value: currRegion,
    setValue: setCurrRegion
  }

  return (
    <div id="page-body">
      <RegionContext.Provider value={regionCtx}>
        <ModalWindow />

        {currRegion !== "" && toponyms.length > 0 && notProvokeBySearch && (
          <BodyList
            // sx={{position: "absolute", top: "220px", left: "10px"}}
            // currRegion={currRegion}
            toponyms={toponyms}
            listItemClickHandler={listItemClickHandler}
          />
        )}

        <div className="svg-container">
          <SvgMap
            height="650px"
            // setCurrRegion={setCurrRegion}
            getInfo={getInfo}
            toponymsData={toponymsData}
            setToponyms={setToponyms}
            setNotProvokeBySearch={setNotProvokeBySearch}
          />
        </div>
      </RegionContext.Provider>

      {/* <BodySearch
        sortedSearchOptions={toponymsData}
        setCurrToponym={setCurrToponym}
        setCurrRegion={setCurrRegion}
        handleOpen={handleOpen}
        setNotProvokeBySearch={setNotProvokeBySearch}
      /> */}

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
    </div>
  );
};

export default Body;
