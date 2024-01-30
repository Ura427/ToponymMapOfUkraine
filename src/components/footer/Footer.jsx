import React from "react";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


const Footer = () => {
  return (
    <footer className=" py-3 mt-4" style={{ backgroundColor: "#1976d2"}}>
      <div className="container">
        <p className="text-center text-white">© 2023 Company, Inc</p>
      </div>
    </footer>

    // <ThemeProvider theme={defaultTheme}>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       minHeight: '100vh',
    //     }}
    //   >

    //     <Box
    //       component="footer"
    //       sx={{
    //         py: 3,
    //         px: 2,
    //         mt: 'auto',
    //         backgroundColor: (theme) =>
    //           theme.palette.mode === 'light'
    //             ? theme.palette.grey[200]
    //             : theme.palette.grey[800],
    //       }}
    //     >
    //       <Container maxWidth="sm">
    //         <Typography variant="body1">
    //           My sticky footer can be found here.
    //         </Typography>
    //         <Copyright />
    //       </Container>
    //     </Box>
    //   </Box>
    // </ThemeProvider>
  );
};

export default Footer;
