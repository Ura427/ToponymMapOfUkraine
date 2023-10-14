import React from "react";
import "./Login.css";

const Login = () => {
  return (
    // <div id="main">
    //     <div id="sign-form">
    //       <h1>Sign In</h1>
    //       <form className="main-form">
    //         <input type="email" name="email"></input>
    //         <input type="password" name="password"></input>
    //         <label>
    //           <input type="checkbox"></input>
    //           Remember me
    //         </label>

    //         <button className="submit-btn" type="submit">Sign In</button>
    //       </form>

    //       <a href="">Forgot password</a>
    //       <a href="">Don't have an account? Sign Up</a>
    //     </div>
    // </div>
    <div id="body">
      <form>
        <img
          class="mb-4"
          src="/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt=""
          width="72"
          height="57"
        />
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="form-check text-start my-3">
          <input
            class="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button class="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
        <p class="mt-5 mb-3 text-body-secondary">© 2017–2023</p>
      </form>
    </div>
  );
};

export default Login;
