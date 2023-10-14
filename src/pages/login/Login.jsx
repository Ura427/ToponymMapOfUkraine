import React from "react";
import "./Login.css";




import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();


const Login = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (

    // <div id="body">
    //   <form>
    //     <img
    //       class="mb-4"
    //       src="/docs/5.3/assets/brand/bootstrap-logo.svg"
    //       alt=""
    //       width="72"
    //       height="57"
    //     />
    //     <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    //     <div class="form-floating">
    //       <input
    //         type="email"
    //         class="form-control"
    //         id="floatingInput"
    //         placeholder="name@example.com"
    //       />
    //       <label for="floatingInput">Email address</label>
    //     </div>
    //     <div class="form-floating">
    //       <input
    //         type="password"
    //         class="form-control"
    //         id="floatingPassword"
    //         placeholder="Password"
    //       />
    //       <label for="floatingPassword">Password</label>
    //     </div>

    //     <div class="form-check text-start my-3">
    //       <input
    //         class="form-check-input"
    //         type="checkbox"
    //         value="remember-me"
    //         id="flexCheckDefault"
    //       />
    //       <label class="form-check-label" for="flexCheckDefault">
    //         Remember me
    //       </label>
    //     </div>
    //     <button class="btn btn-primary w-100 py-2" type="submit">
    //       Sign in
    //     </button>
    //     <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
    //   </form>
    // </div>
    
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
  
    );
};

export default Login;
