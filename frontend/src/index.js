import ReactDom from "react-dom/client";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

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
    <App />
  </Auth0Provider>
);