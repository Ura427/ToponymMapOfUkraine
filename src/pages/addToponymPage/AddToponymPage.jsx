import React, { useContext, useState } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SvgMap from "../../components/svgMap/SvgMap";


import axios from "axios";

import { useNavigate } from "react-router-dom";
import { RegionContext } from "../../store/context/regionContext";




import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';




function AddToponym() {
  const navigate = useNavigate();
  // const [currRegion, setCurrRegion] = useState();
  const region = useContext(RegionContext);
  // const currRegion = region.value;
  const [currRegion, setCurrRegion] = useState();
  const [currToponym, setCurrToponym] = useState();
  const [toponymDesc, setToponymDesc] = useState();
  const [ProvokeByAddToponym, setProvokeByAddToponym] = useState(true);

  const [alertState, setAlertState] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")

  const[didEdit, setDidEdit] = useState();
  const[errorMessage, setErrorMessage] = useState({
    toponym: "",
    desc: ""
  })

  //Validation for toponym input
  function toponymInputVadidate(event) {

    const toponym = event.target.value;

    const ukrainianLettersRegex = /^[а-яіїєґ']+$/i;
    setCurrToponym(toponym);

    //Check if input isn't empty
    if(toponym === ""){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму не може бути пустою"
        }))
        return
    }
    
    //Check if input contains only ukrainian letters
    if(!ukrainianLettersRegex.test(toponym)){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму повинна містити тільки українські букви"
        }))
        return
    }

    //Check if input length is more than 3
    if(toponym.length < 3){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму не може містити менше 3 символів"
        }))
        return
    }

    //Check if toponym length is more than 50
    if(toponym.length > 50){
        setErrorMessage(prevState => ({
            ...prevState,
            toponym: "Назва топоніму не може містити більше 50 символів"
        }))
        return
    }

    //Remove errors if everything is ok
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

  //Toponym save handler
  function btnClickHandler() {

    //Check if data is valid
    if(currRegion === undefined 
        || currToponym === undefined
        || toponymDesc === undefined
        || errorMessage.toponym !== ""
        || errorMessage.desc !== ""){
        console.log("Invalid input")
        return
    }

    //Create obj with data
    const data = {
      regionName: currRegion,
      toponym: currToponym,
      description: toponymDesc,
    };

    //Post data obj to backend
    axios
      .post("api/post", data)
      .then((response) => {
        navigate("/") //Return to main page
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
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "2rem",
          marginBottom: "8rem",
          height: "100vh"
        }}
      >
        <Box>
          <SvgMap height="20rem" ProvokeByAddToponym={ProvokeByAddToponym} setCurrRegion={setCurrRegion}/>
        </Box>


        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
        >
   
        <TextField
        required
        defaultValue={"Оберіть область на карті"}
        value={currRegion}
        InputProps={{
            readOnly: true,
          }}
          sx={{ width: "400px"}}
          />

          
        <TextField
          label="Назва топоніма"
          value={currToponym}
          onChange={toponymInputVadidate}
          helperText={errorMessage.toponym}
          required
          error={errorMessage.toponym !== ""}
          sx={{ width: "400px"}}
        />
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

      {/* <Alert icon={<CheckIcon fontSize="inherit" />} severity={alertState}>
        {alertMessage}
      </Alert> */}

        <Button variant="contained" onClick={btnClickHandler}>
          Зберегти
        </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddToponym;
