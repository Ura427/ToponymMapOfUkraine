import React, { useEffect, useState } from "react";
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

import { appStore } from "../../App.tsx";
import { authActions } from "../../store/auth.ts";
import { currUserActions } from "../../store/currUser.js";
import { useSelector } from "react-redux";
// import { RootState } from 'app/redux/store';


import { modalDescActions, modalOpenActions, modalStore, modalTitleActions } from "../modal/store/modal.ts";


import ModalWindow from "../modal/ModalWindow.tsx"


import { avgRatingActions } from "./store/rating.ts";
import { currRatingActions } from "./store/rating.ts";

import { ratingStore } from "./store/rating.ts";
import { currDataStore, currToponymActions } from "./store/currData.ts";

//Component
const Body = () => {
  // const [open, setOpen] = useState(false);
  // const [modalTitle, setModalTitle] = useState<string | undefined>();
  // const [modalDescription, setModalDescription] = useState<
  //   string | undefined
  // >();

  const [toponyms, setToponyms] = useState<Array<Toponym>>([]);
  // const [currRegion, setCurrRegion] = useState<string | undefined>();
  // const [currToponym, setCurrToponym] = useState<string | undefined>();
  // const [avgRating, setAvgRating] = useState<number>(0);
  // const [currRating, setCurrRating] = useState<number>(0);

  const [notProvokeBySearch, setNotProvokeBySearch] = useState<boolean>(true);

  // type RootState = ReturnType<typeof appStore.getState>;

  const isLoggedIn = useSelector((state: any) => state.auth.value);

  // const currUser = useSelector((state: any) => state.currUser);


  // const avgRating = useSelector((state: any) => state.avgRating.value)

  // const currRating = useSelector((state: any) => state.currRating.value)


  const currToponym = useSelector((state: any) => state.currToponym);
  const currRegion = useSelector((state: any) => state.currRegion)

  //useEffect for Modal window
  useEffect(() => {
    if (currToponym !== "") {
      const toponymDescription = getToponymDescription(currRegion, currToponym);
      // setModalTitle(currToponym);
      modalStore.dispatch(modalTitleActions.setTitle(currToponym))
      // setModalDescription(toponymDescription);
      modalStore.dispatch(modalDescActions.setDesc(toponymDescription));
    }
  }, [currToponym, currRegion]);

  //Cut from BodySearch
  const [backendData, setBackendData] = useState<Array<any>>([]);
  const [toponymsData, setToponymsData] = useState<Array<any>>([]);

  //fetch all backend data
  useEffect(() => {
    fetch("/api/getAll")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  type Toponym = {
    name: string;
    description: string;
  };

  type Region = {
    id: string;
    region: string;
    toponyms: Toponym[];
  };

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
          ratingStore.dispatch(avgRatingActions.setAvgRating(response.data.roundedAvgRating));
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

 
  return (
    <div id="page-body">

      <ModalWindow />

      {currRegion !== "" && toponyms.length > 0 && notProvokeBySearch && (
        <BodyList
          // sx={{position: "absolute", top: "220px", left: "10px"}}
          currRegion={currRegion}
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
