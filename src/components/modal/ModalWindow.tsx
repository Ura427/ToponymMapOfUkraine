import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Rating from "@mui/material/Rating";

import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { appStore } from "../../App.tsx";
import { modalOpenActions, modalStore } from "./store/modal.ts";
import { currRatingActions, ratingStore } from "../body/store/rating.ts";






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

  function handleClose() {
    // setOpen(false);
    modalStore.dispatch(modalOpenActions.setDisabled());
    // setCurrRating(0);
    ratingStore.dispatch(currRatingActions.setCurrRating(0));
  }


 



const ModalWindow = () => {
    
  type RootState = ReturnType<typeof appStore.getState>
  const isLoggedIn = useSelector((state: any) => state.auth.value)

  const modalTitle = useSelector((state: any) => state.title);

  const modalDescription = useSelector((state: any) => state.desc);
  const currRating = useSelector((state: any) => state.currRating);
  const avgRating = useSelector((state: any) => state.avgRating)

  const open: boolean = useSelector((state: any) => state.open);

  const currUser = useSelector((state: any) => state.currUser)

  const currRegion = useSelector((state: any) => state.currRegion);
  const currToponym = useSelector((state: any) => state.currToponym)

  function handleRatingChange(event, value) {
    // setCurrRating((prevValue) => value);
    ratingStore.dispatch(currRatingActions.setCurrRating(value));
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






    return(
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
    )
}

export default ModalWindow;