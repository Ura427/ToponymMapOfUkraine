import React, { useEffect, useState } from "react";
import "./Body.css";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BodySearch from "../body-search/BodySearch.jsx";
import BodyList from "../body-list/BodyList.jsx";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import axios from "axios";

import { Link } from "react-router-dom";
import SvgMap from "../svgMap/SvgMap.jsx";

// import { authStore } from "../../App.tsx";

// import { userStore } from "../../App.tsx";

import { store } from "../../App.tsx"
import { authActions } from "../../store/auth.ts";
import { currUserActions } from "../../store/currUser.js";
import { useSelector } from "react-redux";
// import { RootState } from 'app/redux/store';

//Modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

//Component
const Body = () => {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>();
  const [modalDescription, setModalDescription] = useState<string | undefined>();

  const [toponyms, setToponyms] = useState<Array<Toponym>>([]);
  const [currRegion, setCurrRegion] = useState<string | undefined>();
  const [currToponym, setCurrToponym] = useState<string | undefined>();
  const [avgRating, setAvgRating] = useState<number>(0);
  const [currRating, setCurrRating] = useState<number>(0);

  const [notProvokeBySearch, setNotProvokeBySearch] = useState<boolean>(true);

  // const isLoggedIn = authStore.getState().value;
  // const currUser = userStore.getState();

  type RootState = ReturnType<typeof store.getState>

  const isLoggedIn = useSelector((state: RootState) => state.auth.value) 
  console.log(isLoggedIn)


  const currUser = useSelector((state: RootState) => state.currUser);
  console.log(currUser)


  
  //useEffect for Modal window
  useEffect(() => {
    if (currToponym !== "") {
      const toponymDescription = getToponymDescription(currRegion, currToponym);
      setModalTitle(currToponym);
      setModalDescription(toponymDescription);
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
    name: string,
    description: string
  }

  type Region = {
    id: string,
    region: string,
    toponyms: Toponym[]
  }

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
          setAvgRating((rating) => response.data.roundedAvgRating);
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
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
    setCurrRating(0);
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
    setCurrToponym(toponym);
    handleOpen();
  }

  function handleRatingChange(event, value) {
    setCurrRating((prevValue) => value);
    if (currRating === null) {
      return;
    }

    const object = {
      region: currRegion,
      toponym: currToponym,
      rating: value,
      user_id: currUser.id,
    };

    axios
      .post("/rating/add", object)
      .then((response) => {
        console.log("Додано успішно");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Помилка додавання топоніма: " + error.response.message);
        }
        console.log("Помилка додавання топоніма: " + error.message);
      });
  }


  return (
    <div id="page-body">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalDescription}
          </Typography>

          {isLoggedIn && (
            <Box sx={{ marginTop: "1rem" }}>
              <Typography component="legend">
                Оцініть достовірність цього топоніма
              </Typography>
              <StyledRating
                name="customized-color"
                defaultValue={0}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                onChange={(event, value) =>
                  // setCurrRating(value)
                  handleRatingChange(event, value)
                }
                value={currRating}
              />
              {avgRating !== null ? (
                <Typography>Середня оцінка: {avgRating}</Typography>
              ) : (
                <Typography>Ваш відгук буде першим :)</Typography>
              )}
            </Box>
          )}
        </Box>
      </Modal>

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
          setCurrRegion={setCurrRegion}
          getInfo={getInfo}
          toponymsData={toponymsData}
          setToponyms={setToponyms}
          setNotProvokeBySearch={setNotProvokeBySearch}
        />
      </div>
      <BodySearch
        sortedSearchOptions={toponymsData}
        setCurrToponym={setCurrToponym}
        setCurrRegion={setCurrRegion}
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
    </div>
  );
};

export default Body;
