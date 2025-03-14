import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const { user } = useAuth0();
  const queryRef = useRef();

  const token = userDetails?.token; // Ensure token exists

  console.log("🔹 Using token in useFavourites:", token);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", user?.email],
    queryFn: () => getAllFav(user?.email, token),
    enabled: !!user?.email && !!token, // Prevents unnecessary API calls
    staleTime: 30000,
    onSuccess: (data) => {
      if (data) {
        setUserDetails((prev) => ({ ...prev, favourites: data }));
      }
    }
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (data) {
      setUserDetails((prev) => ({ ...prev, favourites: data }));
    }
  }, [data]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
