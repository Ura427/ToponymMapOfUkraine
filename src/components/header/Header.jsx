import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

const Header = ({ isLoggedIn, setIsLoggedIn, currUser, setCurrUser }) => {
  console.log(isLoggedIn);
  console.log(currUser);


  const exitClickhandler = () => {
    setIsLoggedIn(false);
    setCurrUser({});
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Toponym UA
          </Typography>

          {isLoggedIn ? (
            <>
            <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
          >
            {currUser.firstname[0]}
          </Avatar>
              {/* <AccountCircleIcon>
                {currUser.firstname}
              </AccountCircleIcon> */}

              <Link
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button onClick={exitClickhandler} color="inherit" style={{ textDecoration: "none" }}>
                  Вийти
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button color="inherit">Увійти</Button>
              </Link>
              <Link
                to="/registration"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button color="inherit" style={{ textDecoration: "none" }}>
                  Зареєструватися
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
