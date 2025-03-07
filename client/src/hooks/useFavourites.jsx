import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const { user } = useAuth0();
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", user?.email],
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    enabled: !!user && !!userDetails?.token, // Fetch only if user & token exist
    staleTime: 30000, // Cache for 30 seconds
    onSuccess: (data) => {
      if (data) {
        setUserDetails((prev) => ({ ...prev, favourites: data })); // Store in context
      }
    },
    onError: (error) => {
      console.error("Error fetching favorites:", error);
    }
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => ({ ...prev, favourites: data })); // Update UI
    }
  }, [data, setUserDetails]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
