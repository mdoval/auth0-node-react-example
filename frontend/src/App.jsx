import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function App() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  async function apiProtegida() {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://nubecosmica.us.auth0.com/api/v2/`,
        scope: "read:current_user",
      },
    });
  
    await axios
      .get("http://localhost:8000/api/test-protegida" , {headers: {
        Authorization: `Bearer ${accessToken}`,
      } 
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  async function apiLiberada() {
    await axios
      .get("http://localhost:8000/api/test-liberada")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(user)

  return (
    <>
      <h1>Hola App</h1>
      <br />
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <br />
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      <div>
        <p>
          {isAuthenticated
            ? `Usuario Autenticado ${user.email}`
            : "No Autenticado"}
        </p>
      </div>
      <button onClick={apiProtegida}>Llamar Api Protegida</button>
      <br></br>
      <button onClick={apiLiberada}>Llamar Api Liberada</button>
    </>
  );
}
