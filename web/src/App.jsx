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
  const [lastTokenCheckTime, setLastTokenCheckTime] = useState(new Date());

  function checkToken() {
    fetch("/secure/token").then((response) => {
      if (response.ok) {
        setLoggedIn(true);
        setLoggingIn(false);
      }
      setTimeout(() => setLastTokenCheckTime(new Date()), 1000); // triggers useEffect to re-check token, this accounts for lag on Google end
    });
  }

  useEffect(() => {
    if (token && !loggedIn) {
      checkToken(); // TOOD invalid token causes infinite loop here...
    }
  }, [token, loggingIn, loggedIn, lastTokenCheckTime]);

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
