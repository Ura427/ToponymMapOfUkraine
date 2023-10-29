import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {


  return (
    // <header className="p-3 text-bg-dark">
    //   <div className="container">
    //     <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    //       <a
    //         href="/"
    //         className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
    //       >
    //         <svg
    //           className="bi me-2"
    //           width="40"
    //           height="32"
    //           role="img"
    //           aria-label="Bootstrap"
    //         >
    //           {/* <use xlink:href="#bootstrap"></use> */}
    //         </svg>
    //       </a>

    //       <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
    //         {/* <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
    //             <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
    //             <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
    //             <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
    //             <li><a href="#" className="nav-link px-2 text-white">About</a></li> */}
    //       </ul>

    //       <form
    //         className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
    //         role="search"
    //       >
    //         <input
    //           type="search"
    //           className="form-control form-control-dark text-bg-dark"
    //           placeholder="Search..."
    //           aria-label="Search"
    //         />
    //       </form>

    //       <div className="text-end">
    //         <Link to="/login">
    //           <button type="button" className="btn btn-outline-light me-2">
    //             Login
    //           </button>
    //         </Link>
    //         <Link to="/registration">
    //           <button type="button" className="btn btn-warning">
    //             Sign-up
    //           </button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </header>


   


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
          <Link to="/login" style={{ color: "inherit", textDecoration: "none"}}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/registration" style={{ color: "inherit", textDecoration: "none"}}>
            <Button color="inherit" style={{textDecoration: "none"}}>Sign up</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
