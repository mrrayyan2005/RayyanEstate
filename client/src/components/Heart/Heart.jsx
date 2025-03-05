import { useContext, useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import useAuthCheck from "../../hooks/useAuthCheck"
import { useMutation } from "@tanstack/react-query"
import { useAuth0 } from "@auth0/auth0-react"
import UserDetailContext from "../../context/UserDetailContext"
import { updateFavourites, checkFavourites } from "../../utils/common"
import { toFav } from "../../utils/api"

const Heart = ({id}) => {

    const [heartColor, setHeartColor] = useState("white")
    const {validateLogin} = useAuthCheck()
    const {user} = useAuth0()

    const {
        userDetails: { favourites = [], token },  // ✅ Ensure favourites is always an array
        setUserDetails,
      } = useContext(UserDetailContext);

      useEffect(()=> {
            setHeartColor(()=> checkFavourites(id, favourites))
      },[favourites])


    const { mutate } = useMutation({
        mutationFn: ({ id, email, token }) => toFav(id, email, token), // ✅ Pass parameters correctly
        onSuccess: () => {
          setUserDetails((prev) => ({
            ...prev,
            favourites: updateFavourites(id, prev.favourites),
          }));
        },
      });
      
      const handleLike = () => {
        if (validateLogin()) {
          mutate({ id, email: user?.email, token }); // ✅ Pass arguments properly
          setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
        }
      };
      
  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=> {
        e.stopPropagation()
        handleLike()
    }}/>
  )
}

export default Heart