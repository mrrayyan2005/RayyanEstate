import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const { user, getAccessTokenSilently } = useAuth0(); // ✅ Get token silently
  const queryRef = useRef();

  const fetchFavourites = async () => {
    if (!user?.email) return []; // Prevent unnecessary API calls
    try {
      const token = await getAccessTokenSilently(); // ✅ Fetch token securely
      return await getAllFav(user.email, token); // ✅ Use token in API call
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", user?.email],
    queryFn: fetchFavourites, // ✅ Updated function call
    enabled: !!user, // ✅ Ensure query only runs if user exists
    staleTime: 30000, // Cache results for 30 seconds
    onSuccess: (data) => {
      setUserDetails((prev) => ({ ...prev, favourites: data })); // ✅ Persist in context
    },
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => ({ ...prev, favourites: data })); // ✅ Ensure UI updates
    }
  }, [data, setUserDetails]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
