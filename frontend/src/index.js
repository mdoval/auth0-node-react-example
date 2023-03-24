import ReactDom from "react-dom/client";
import { App } from "./App";
import { App2 } from "./App2";
import { App3 } from "./App3";
import { Auth0Provider } from "@auth0/auth0-react";
import  { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="nubecosmica.us.auth0.com"
    clientId="z7XQhUIWX38hX4PaFqQs3Zt55BCZWcVr"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://nubecosmica.us.auth0.com/api/v2/",
      scope: "read:current_user update:current_user_metadata",
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/app2" element={<App2 />} />
        <Route path="/app3" element={<App3 />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);
