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

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
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

        // Check if token already exists in localStorage
        const existingToken = localStorage.getItem("access_token");
        if (existingToken) {
          console.log("Token already exists:", existingToken);
          setUserDetails((prev) => ({ ...prev, token: existingToken }));
          return; // Exit function to prevent pop-up loop
        }

        // Fetch new token if none exists
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "https://rayyan-estate-server.vercel.app",
            scope: "openid profile email",
          },
        });

        if (!res) {
          console.error("No token received from getAccessTokenWithPopup");
          return;
        }

        console.log("Token received:", res);
        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));

        // Call mutate to register the user (ensure email exists)
        mutate(res);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    if (isAuthenticated && user?.email) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user, mutate]);  // Added `mutate` to dependencies

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Header />
        <Outlet /> {/* This will render the Website component inside Layout */}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
