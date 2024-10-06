import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import EditEntry from "./components/EditEntry";
import NewEntry from "./components/NewEntry";
import ReadEntry from "./components/ReadEntry";
import Login from "./components/Login";
import { GlobalContext } from "./components/GlobalProvider";

function App() {
  const [credentialResponse, setCredentialResponse] = useState({});
  const { globalState, setGlobalState } = useContext(GlobalContext);

  return credentialResponse.credential ? (
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
        setCredentialResponse(credentialResponse);
        setGlobalState({ ...globalState, credentialResponse });
      }}
    ></Login>
  );
}

export default App;
