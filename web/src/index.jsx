import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalProvider } from "./components/GlobalProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApiRoutes } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));

const config = await (async () => {
  const response = await fetch(ApiRoutes.config);
  return response.json();
})();

root.render(
  <React.StrictMode>
    <GlobalProvider>
      <GoogleOAuthProvider clientId={config.GOOGLE_OAUTH_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </GlobalProvider>
  </React.StrictMode>
);
