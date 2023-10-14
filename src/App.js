// import "./App.css";
// import "./myApp.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";


import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
