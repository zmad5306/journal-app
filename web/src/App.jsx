import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import EditEntry from "./components/EditEntry";
import NewEntry from "./components/NewEntry";
import ReadEntry from "./components/ReadEntry";
import Login from "./components/Login";
import Cookies from "js-cookie";
import LoginProcessing from "./components/LoginProcessing";
import { ApiRoutes } from "./config";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [lastTokenCheckTime, setLastTokenCheckTime] = useState(new Date());
  const [first, setFirst] = useState(true);

  function checkToken(first) {
    fetch(ApiRoutes.token).then((response) => {
      if (response.ok) {
        setLoggedIn(true);
        setLoggingIn(false);
      }
      if (!first) {
        setTimeout(() => setLastTokenCheckTime(new Date()), 1000);
      }
    });
  }

  useEffect(() => {
    if (token && !loggedIn) {
      checkToken(first);
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
            setFirst(false);
          }}
        ></Login>
      )}
      {loggingIn && <LoginProcessing></LoginProcessing>}
    </>
  );
}

export default App;
