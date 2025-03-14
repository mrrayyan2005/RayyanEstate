import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import {Auth0Provider} from "@auth0/auth0-react"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
  domain="dev-7q83fq2272cfxooq.us.auth0.com"
  clientId="h95tnO3RQiwWDj2UYAFhwrTSAVJ1uARZ"
  authorizationParams={{
    redirect_uri: "https://rayyan-estate.vercel.app/callbacks",
  }}
  audience="https://rayyan-estate-server.vercel.app/"  // Update this if your backend is deployed
  scope="openid profile email"
>
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <App />
  </MantineProvider>
</Auth0Provider>

  </React.StrictMode>
);
