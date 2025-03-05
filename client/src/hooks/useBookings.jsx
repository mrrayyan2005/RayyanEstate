import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const { user } = useAuth0();
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allBookings", user?.email],
    queryFn: () => getAllBookings(user?.email, userDetails?.token),
    enabled: !!user && !!userDetails?.token, // Fetch only if user & token exist
    staleTime: 30000, // Cache for 30 seconds
    onSuccess: (data) => {
      if (data) {
        setUserDetails((prev) => ({ ...prev, bookings: data })); // Store in context
      }
    }
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => ({ ...prev, bookings: data })); // Update UI
    }
  }, [data]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
