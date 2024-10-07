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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      fetch("/secure/token")
        .then((response) => {
          if (response.ok) {
            return true;
          }
          return false;
        })
        .then((loggedInResult) => {
          setLoggedIn(loggedInResult);
        });
    }
  }, [token]);

  return (
    <>
      {loggedIn ? (
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
            Cookies.set("token", credentialResponse.credential, { path: "/" });
            setToken(credentialResponse.credential);
            setLoggedIn(true);
          }}
        ></Login>
      )}
    </>
  );
}

export default App;
