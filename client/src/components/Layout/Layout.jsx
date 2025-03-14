import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserDetailContext from "../../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

function Layout() {
  useFavourites();
  useBookings();
  
  const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: ["registerUser", user?.email],
    mutationFn: (token) => createUser(user?.email, token),
    onError: (error) => {
      console.error("User registration failed:", error);
    },
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      if (!user?.email || userDetails?.token) return; // ✅ Prevent unnecessary calls

      try {
        let token = localStorage.getItem("access_token");

        if (!token) {
          console.log("Fetching new access token...");
          token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "http://localhost:8000",
              scope: "openid profile email",
            },
          });

          localStorage.setItem("access_token", token);
        } else {
          console.log("Using stored token.");
        }

        setUserDetails((prev) => ({ ...prev, token }));
        mutate(token); // ✅ Register user with the token
      } catch (error) {
        console.warn("Silent authentication failed, redirecting to login...");
        await loginWithRedirect({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user?.email, userDetails?.token, getAccessTokenSilently, loginWithRedirect, mutate, setUserDetails]);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
