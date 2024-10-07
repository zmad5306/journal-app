import React, { useState, useEffect } from "react";
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
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function checkToken() {
    fetch("/secure/token").then((response) => {
      if (response.ok) {
        setLoggedIn(true);
        setLoggingIn(false);
      }
    });
  }

  function waitForToken(tries) {
    if (tries < 5) {
      checkToken();
      setTimeout(() => {
        waitForToken(tries + 1);
      }, 1000);
    }
  }

  useEffect(() => {
    console.log("EXECUTING USE EFFECT!!!!!!");
    if (token) {
      checkToken();
      if (loggingIn && !loggedIn) {
        waitForToken(0);
      }
    }
  }, [token, loggingIn, loggedIn]);

  return (
    <>
      {loggedIn && (
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
      )}
      {!loggedIn && !loggingIn && (
        <Login
          onSuccess={(credentialResponse) => {
            Cookies.set("token", credentialResponse.credential, { path: "/" });
            setToken(credentialResponse.credential);
            setLoggingIn(true);
            // poll back end with token until we get a positive response
          }}
        ></Login>
      )}
      {loggingIn && <p>You are being logged in</p>}
    </>
  );
}

export default App;
