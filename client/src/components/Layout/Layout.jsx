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
  const { isAuthenticated, user, getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        console.log("Fetching access token...");
        if (!user) {
          console.log("User object is not available.");
          return;
        }

        // Check if token already exists in localStorage
        const existingToken = localStorage.getItem("access_token");
        if (existingToken) {
          console.log("Token already exists:", existingToken);
          setUserDetails((prev) => ({ ...prev, token: existingToken }));
          return;
        }

        let token;
        try {
          // Try fetching the token silently (without a popup)
          token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "http://localhost:8000",
              scope: "openid profile email",
            },
          });
        } catch (silentError) {
          console.warn("Silent token fetch failed, trying popup method...", silentError);

          // If silent fetch fails, use the popup method
          token = await getAccessTokenWithPopup({
            authorizationParams: {
              audience: "http://localhost:8000",
              scope: "openid profile email",
            },
          });
        }

        console.log("Token received:", token);
        localStorage.setItem("access_token", token);
        setUserDetails((prev) => ({ ...prev, token }));

        // Call mutate to register the user
        mutate(token);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user]); 

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
