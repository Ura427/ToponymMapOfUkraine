import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { store } from "../../store/store.js";
import { currUserActions } from "../../store/slices/currUser.ts";
import { login } from "../../store/slices/auth.js";
import { useDispatch } from "react-redux";

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
        ToponymUA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    // setIsValidEmail(email.includes("@") && email.length >= 3);
    setIsValidEmail(email.includes("@"));
  };

  const validatePassword = (password) => {
    setIsValidPassword(password.length >= 3);
  };

  const handleEmailChange = (email) => {
    setUserEmail(email);
    validateEmail(email);

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      email: true,
    }));
  };

  const handlePasswordChange = (password) => {
    setUserPassword(password);
    validatePassword(password);

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      password: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Other form submission logic if needed
  };

  const handleLogin = () => {
    const userData = {
      userEmail: userEmail,
      userPassword: userPassword,
    };

    axios
      .post("/login", userData)
      .then((response) => {
        console.log("Вхід успішний");
        dispatch(login());
        dispatch(currUserActions.setCurrUser(response.data.user));
        navigate("/");
      })
      .catch((error) => {
        setIsValidEmail(false);
        setIsValidPassword(false);
        setUserEmail("");
        setUserPassword("");
        if (error.response) {
          console.log("Помилка входу ", error.response.data.message);
        } else {
          console.log("Помилка входу ", error.message);
        }
      });
  };

  return (
    <ThemeProvider theme={createTheme()}>
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
            Вхід
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Електронна адреса"
              name="email"
              autoComplete="email"
              autoFocus
              value={userEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={userPassword}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            {(!isValidEmail || !isValidPassword) &&
              didEdit.email &&
              didEdit.password && (
                <Typography style={{ color: "red" }}>
                  Неправильний логін або пароль
                </Typography>
              )}
            <Button
              disabled={!isValidEmail || !isValidPassword}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Увійти
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Забули пароль?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/registration">
                  Не маєте акаунту? Зареєструйтеся
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
