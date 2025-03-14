import React, { useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";  // <-- Add this import
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserDetailContext from "../../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import {createUser} from "../../utils/api"
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";

function Layout() {
  useFavourites()
  useBookings()
  const { isAuthenticated, user,getAccessTokenWithPopup } = useAuth0();
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
          return; // Exit function to prevent pop-up loop
        }
  
        // Fetch new token if none exists
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });
  
        console.log("Token received:", res);
        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));
  
        // Call mutate to register the user
        mutate(res);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };
  
    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, user]); // Runs only when `isAuthenticated` or `user` changes
  
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
