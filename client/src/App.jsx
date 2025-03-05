import { useState, Suspense } from "react";
import "./App.css";
import Website from "./pages/Website";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import UserDetailContext from "./context/UserDetailContext.js";
import Property from "./pages/Property/Property";
import "@mantine/core/styles.css"; // Ensure Mantine styles are applied
import "@mantine/dates/styles.css";
const queryClient = new QueryClient();
import Bookings from "./pages/Bookings/Bookings.jsx";
import Favourites from "./pages/Favourites/Favourites.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
function App() {
 
  const [userDetails, setUserDetails] = useState({
    Favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties">
                <Route index element={<Properties />} />
                <Route path=":propertyId" element={<Property />} />
              </Route>
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
