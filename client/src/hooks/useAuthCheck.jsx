import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const useAuthCheck = () => {
  const { isAuthenticated, loginWithPopup, loginWithRedirect } = useAuth0();

  const validateLogin = async () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in", { position: "bottom-right" });

      try {
        await loginWithPopup(); // Try popup login first
      } catch (error) {
        console.error("Popup login failed, using redirect...", error);
        await loginWithRedirect(); // Fallback to redirect login
      }
      return false;
    }
    return true;
  };

  return { validateLogin };
};

export default useAuthCheck;

