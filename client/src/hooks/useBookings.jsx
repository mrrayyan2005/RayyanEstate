import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const { user, getAccessTokenSilently } = useAuth0();
  const queryRef = useRef();

  const fetchBookings = async () => {
    if (!user?.email) return []; // Prevent unnecessary API calls
    try {
      const token = await getAccessTokenSilently(); 
      return await getAllBookings(user.email, token); 
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allBookings", user?.email],
    queryFn: fetchBookings, //  Ensuring token is always fresh
    enabled: !!user, 
    staleTime: 30000, // Cache results for 30 seconds
    onSuccess: (data) => {
      setUserDetails((prev) => ({ ...prev, bookings: data })); 
    },
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => ({ ...prev, bookings: data })); //  Ensure UI updates
    }
  }, [data, setUserDetails]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
