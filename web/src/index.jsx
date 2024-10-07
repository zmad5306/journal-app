import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApiRoutes } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));

const config = await fetch(ApiRoutes.config).then((response) => {
  if (response.ok) {
    return response.json();
  }
  console.error("Could not get config", response);
  return {};
});

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={config.GOOGLE_OAUTH_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
