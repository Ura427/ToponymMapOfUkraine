import React, { useState } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SvgMap from "../svgMap/SvgMap";


import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddToponym() {
  const navigate = useNavigate();
  const [currRegion, setCurrRegion] = useState();
  const [currToponym, setCurrToponym] = useState();
  const [toponymDesc, setToponymDesc] = useState();

  const[didEdit, setDidEdit] = useState();
  const[errorMessage, setErrorMessage] = useState({
    toponym: "",
    desc: ""
  })

  function toponymInputVadidate(event) {

    const toponym = event.target.value;

    const ukrainianLettersRegex = /^[а-яіїєґ']+$/i;
    setCurrToponym(toponym);


    if(toponym === ""){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму не може бути пустою"
        }))
        return
    }
    
    if(!ukrainianLettersRegex.test(toponym)){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму повинна містити тільки українські букви"
        }))
        return
    }

    if(toponym.length < 3){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму не може містити менше 3 символів"
        }))
        return
    }

    if(toponym.length > 50){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму не може містити більше 50 символів"
        }))
        return
    }

    setErrorMessage(prevState => ({
        ...prevState,
        toponym: ""
    }))
    
  }

  function descriptionInputValidate(event) {

    const description = event.target.value;
    setToponymDesc(description);

    if( description === ""){
        setErrorMessage(prevState => ({
            ...prevState,
            desc:"Інформація про топонім не може бути пустим рядком" 
        }))
        return
    }
   
    if(description.length < 30){
        setErrorMessage(prevState => ({
            ...prevState,
            desc:"Інформація про топонім має містити не менше ніж 30 символів"
        }))
        return
    }
    if(description.length >= 2000){ 
        setErrorMessage(prevState => ({
            ...prevState,
            desc:"Інформація про топонім має містити не більше ніж 2000 символів"
        }))
        return
    }
    
    setErrorMessage(prevState => ({
        ...prevState,
        desc:""
    }))
    

  }

//   console.log("/////////////////////////")
//   console.log(currRegion === undefined)
//   console.log(currToponym === undefined)
//   console.log(toponymDesc === undefined)
//   console.log(errorMessage.toponym !== "")
//   console.log(errorMessage.desc !== "")

  function btnClickHandler() {

    if(currRegion === undefined 
        || currToponym === undefined
        || toponymDesc === undefined
        || errorMessage.toponym !== ""
        || errorMessage.desc !== ""){
        console.log("Invalid input")
        return
    }
    // toponymInputVadidate()
    const data = {
      regionName: currRegion,
      toponym: currToponym,
      description: toponymDesc,
    };

    axios
      .post("api/post", data)
      .then((response) => {
        navigate("/")
        console.log("Топонім додано успішно");
      })
      .catch((error) => {
        if (error.message) {
          console.error("Помилка: ", error.message);
        }
        console.error("Помилка: ", error);
      });

    console.log(data)
  }


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          marginTop: "2rem",
          marginBottom: "8rem",
        //   backgroundColor: "lightgrey",
        }}
      >
        <Box>
          <SvgMap height="20rem" setCurrRegion={setCurrRegion} />
        </Box>

        <TextField
        required
        defaultValue={"Оберіть область на карті"}
        value={currRegion}
        // error
        InputProps={{
            readOnly: true,
          }}/>

          
        <TextField
        //   fullWidth
          label="Назва топоніма"
          value={currToponym}
          onChange={toponymInputVadidate}
          helperText={errorMessage.toponym}
          required
          error={errorMessage.toponym !== ""}
        />

        {/* <Typography>Додайте опис</Typography> */}
        <TextField
          id="outlined-multiline-static"
          label="Опис"
          multiline
          rows={4}
          defaultValue=""
          required
          error={errorMessage.desc !== ""}
    
          value={toponymDesc}
          helperText={errorMessage.desc}
          onChange={descriptionInputValidate}
          sx={{ width: "400px"}}
        />

        <Button variant="contained" onClick={btnClickHandler}>
          Зберегти
        </Button>
      </Box>
    </>
  );
}

export default AddToponym;
