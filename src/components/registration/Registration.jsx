import React, {useState} from "react";
import axios from "axios"

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


import Icon from 'react-icons-kit'
import {basic_eye} from 'react-icons-kit/linea/basic_eye'
import {basic_eye_closed} from 'react-icons-kit/linea/basic_eye_closed'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const defaultTheme = createTheme();

const Registration = () => {

  // const [userFirstName, setUserFirstName] = useState('');
  // const [userLastName, setUserLastName] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  // const [userPassword, setUserPassword] = useState('');


  const [enteredValues, setEnteredValues] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:''
  })



  const [didEdit, setDidEdit] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  })

  

  const firstNameIsInvalid = didEdit.firstName && enteredValues.firstName === '';
  const lastNameIsInvalid = didEdit.lastName && enteredValues.firstName === '';
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  const passwordIsInvalid = didEdit.password && enteredValues.firstName === '';

  const invalidData = 
    firstNameIsInvalid || 
    lastNameIsInvalid || 
    emailIsInvalid || 
    passwordIsInvalid ||
    enteredValues.firstName === '' ||
    enteredValues.lastName === '' ||
    enteredValues.email === '' ||
    enteredValues.password === '' 
    ;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName")
    });
  };

  const handleInputChange = (identifier, value) => { 
    //Змінює значення реєстраційного стану
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value
    }))
    
    
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: false
    }))
  }



  const handleInputBlur= (identifier) => {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }))
  }


  console.log(didEdit)
  console.log(invalidData)


  const handleRegistration = () => {
    // Відправляйте дані реєстрації на сервер
    // Створіть об'єкт з даними для реєстрації

    if(invalidData){
      console.log("Invalid data")
      return;
    }

    const userData = {
      // userFirstName: userFirstName,
      // userLastName: userLastName,
      // userEmail: userEmail,
      // userPassword: userPassword,
      userFirstName: enteredValues.firstName,
      userLastName: enteredValues.lastName,
      userEmail: enteredValues.email,
      userPassword: enteredValues.password,
    };

    // Відправте POST-запит на сервер
    axios.post('/register', userData)
      .then(response => {
        // Обробка успішної реєстрації, наприклад, перенаправлення на сторінку входу
        console.log('Реєстрація пройшла успішно');
      })
      
      .catch(error => {
        // Обробка помилок реєстрації, наприклад, виведення повідомлення про помилку
        if (error.response) {
          console.error('Помилка реєстрації:', error.response.data.message);
        } else {
          console.error('Помилка реєстрації:', error.message);
        }
      });
  };




  const [type, setType] = useState("password");

  // const [ lowerValidated, setLowerValidated] = useState(false)
  // const [ upperValidated, setUpperValidated] = useState(false)
  // const [ numberValidated, setNumberValidated] = useState(false)
  // const [ specialValidated, setSpecialValidated] = useState(false)
  // const [ lengthValidated, setLengthValidated] = useState(false)






  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Реєстрація
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                type="email"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ім'я"
                  autoFocus
                  // value={userFirstName}
                  // onChange={e => setUserFirstName(e.target.value)}
                  value={enteredValues.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  onBlur={() => handleInputBlur('firstName')}
                />
                <Box>{firstNameIsInvalid && <Typography style={{color: 'red'}}>Введіть ім'я</Typography>}</Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Прізвище"
                  name="lastName"
                  autoComplete="family-name"
                  value={enteredValues.lastName}
                  // onChange={e => setUserLastName(e.target.value)}
                  onChange={e => handleInputChange('lastName', e.target.value)}
                  onBlur={() => handleInputBlur('lastName')}
                />
                <Box>{lastNameIsInvalid && <Typography style={{color: 'red'}}>Введіть прізвище</Typography>}</Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Електронна адреса"
                  name="email"
                  autoComplete="email"
                  type="email"
                  // value={userEmail}
                  // onChange={e => setUserEmail(e.target.value)}
                  value={enteredValues.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  onBlur={() => handleInputBlur('email')}
                />
                <Box>{emailIsInvalid && <Typography style={{color: 'red'}}>Введіть існуючу email адресу</Typography>}</Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  // type="password"
                  type={type}
                  id="password"
                  autoComplete="new-password"
                  value={enteredValues.password}
                  // onChange={e => setUserPassword(e.target.value)}
                  onChange={e => handleInputChange('password', e.target.value)}
                  onBlur={ () => handleInputBlur("password")}
                  
                />
                {type === 'password' ? (
                  <span style={{cursor: "pointer"}}
                  onClick={() => setType("text")}>
                    <Icon icon={basic_eye_closed} size={18}/>
                  </span>
                ):(
                  <span style={{cursor: "pointer"}}
                  onClick={() => setType("password")}>
                    <Icon icon={basic_eye} size={18}/>
                  </span>
                )}
                <Box>{passwordIsInvalid && <Typography style={{color: 'red'}}>Введіть існуючу email адресу</Typography>}</Box>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              
              disabled = {invalidData}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegistration}
            >
              Зареєструватися
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Вже маєте акаунт? Увійдіть
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Registration;
