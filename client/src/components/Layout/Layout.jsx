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

  const { isAuthenticated, user, getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        if (!user || !user.email) {
          console.warn("User object is not available yet.");
          return;
        }

        console.log("Fetching access token...");

        let token = null;

        try {
          // 🔹 Try to get token silently first (with caching)
          token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://rayyan-estate-server.vercel.app",
              scope: "openid profile email",
            },
          });
        } catch (silentError) {
          console.warn("Silent auth failed, using popup:", silentError);

          // 🔹 If silent auth fails, use popup
          token = await getAccessTokenWithPopup({
            authorizationParams: {
              audience: "https://rayyan-estate-server.vercel.app",
              scope: "openid profile email",
            },
          });
        }

        if (!token) {
          console.error("No token received from Auth0");
          return;
        }

        console.log("Token received:", token);
        localStorage.setItem("access_token", token);
        setUserDetails((prev) => ({ ...prev, token }));

        // Register user with fresh token
        mutate(token);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    if (isAuthenticated && user?.email) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user, mutate]);

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
