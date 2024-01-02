//Essentials and hooks
import React, { useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

//MUI
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

//Context
import { RegionContext } from "../../store/context/regionContext.js";
import { ToponymContext } from "../../store/context/toponymContext.js";
import { ModalContext } from "../../store/context/modalContext.js";

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



const ModalWindow = () => {
  const isLoggedIn = useSelector((state) => state.auth.value);
  const currUser = useSelector((state) => state.currUser);

  const region = useContext(RegionContext);
  const toponym = useContext(ToponymContext);
  const modal = useContext(ModalContext);

  const open = modal.value.open;
  const modalTitle = modal.value.title;
  const modalDescription = modal.value.desc;

  const currRating = useSelector((state) => state.currRating);
  const avgRating = useSelector((state) => state.avgRating);


  function handleClose() {
    // setOpen(false);
    // modalStore.dispatch(modalOpenActions.setDisabled());
  
    modal.setValue(prevState => ({
      ...prevState,
      open: false
    }));
  
    // setCurrRating(0);
    // ratingStore.dispatch(currRatingActions.setCurrRating(0));
  }

  const dispatch = useDispatch();

  function handleRatingChange(event, value) {
    // dispatch(currRatingActions.setCurrRating(value));
    if (currRating === null) {
      return;
    }

    const object = {
      region: region.value,
      toponym: toponym.value,
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
  );
};

export default ModalWindow;
