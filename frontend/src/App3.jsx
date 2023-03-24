import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function App3() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function getToken() {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://nubecosmica.us.auth0.com/api/v2/`,
        scope: "read:current_user",
      },
    }).catch((error) => {
      alert(error);
    });
    return accessToken;
  }

  async function llamarApi(accessToken) {
    await axios
      .get("http://localhost:8000/api/test-protegida", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function llamarApiProtegida() {
      const miToken = await getToken()
      llamarApi(miToken)
      console.log(miToken);
  }

  if(isAuthenticated) console.log(user)
  else console.log("no hay usuario logueado")

  return (
    <>
      <h1>App3</h1>
      <br />
      <button onClick={llamarApiProtegida}>Api Protegida</button>
      <br />
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <br />
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } }) }>
        Log Out
      </button>
    </>
  );
}
