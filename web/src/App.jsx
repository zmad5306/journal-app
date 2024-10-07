import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import EditEntry from "./components/EditEntry";
import NewEntry from "./components/NewEntry";
import ReadEntry from "./components/ReadEntry";
import Login from "./components/Login";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [loggedIn, setLoggedIn] = useState(false);

  if (token) {
    fetch("/secure/token")
      .then((response) => {
        console.log("response", response);
        if (response.ok) {
          return true;
        }
        return false;
      })
      .then((loggedInResult) => {
        console.log("loggedInResult", loggedInResult);
        setLoggedIn(loggedInResult);
      });
  }

  return loggedIn ? (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditEntry />} />
          <Route path="/read/:id" element={<ReadEntry />} />
          <Route path="/new" element={<NewEntry />} />
        </Routes>
      </div>
    </Router>
  ) : (
    <Login
      onSuccess={(credentialResponse) => {
        document.cookie = `token=${credentialResponse.credential}`;
        setToken(credentialResponse.credential);
        setLoggedIn(true);
      }}
    ></Login>
  );
}

export default App;
