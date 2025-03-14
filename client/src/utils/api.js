import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
export const api = axios.create({
    baseURL: "https://rayyan-estate-server.vercel.app/api",
  });
  export const getAllProperties = async () => {
    try {
      const response = await api.get("/residency/allresd", {
        timeout: 10 * 1000,
      });
  
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };
  export const getProperty = async (id) => {
    try {
      const response = await api.get(`/residency/${id}`, {
        timeout: 10 * 1000,
      });
  
      if (response.status === 400 || response.status === 500) {
        throw response.data;
      }
      return response.data;
    } catch (error) {
      toast.error("Something went wrong");
      throw error;
    }
  };
  export const createUser = async (email, token) => {
    try {
      await api.post(
        `/user/register`,
        { email },{
          headers: {
            Authorization: `Bearer ${token}`,
        },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
      throw error;
    }
  };
  export const bookVisit = async (date, propertyId, email, token) => {
    try {
      await api.post(
        `/user/bookVisit/${propertyId}`,
        {
          email,
          id: propertyId,
          date: dayjs(date).format("DD/MM/YYYY"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
      throw error;
    }
  };
  export const removeBooking = async (id, email, token) => {
    try {
      await api.post(
        `/user/removeBooking/${id}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong, Please try again");
  
      throw error;
    }
  };
  export const toFav = async (id, email, token) => {
    try {
      await api.post(
        `/user/toFav/${id}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      throw e;
    }
  };
 export const getAllFav = async (email, token) => {
    if (!token) {
        console.warn("🚨 Token is missing! Request will fail.");
        return [];
    }

    try {
        console.log("🔹 Fetching favorites with token:", token);
        const res = await api.post(
            `/user/allFav`,
            { email },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ Fetched Favorites:", res.data);
        return res.data["favResidenciesID"] || []; 

    } catch (e) {
        console.error("❌ Error fetching favs:", e.response?.data || e.message);
        return []; 
    }
};


  
  
  
  export const getAllBookings = async (email, token) => {
    if (!token) return;
  
    try {
      const res = await api.post(
        `/user/allBookings`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched Bookings:",res.data);
      return res.data["bookedVisits"] || []; // ✅ Return an empty array if no bookings exist
    } catch (error) {
      console.error("Error fetching favs:", e);
      toast.error("Something went wrong while fetching bookings");
      return []; // ✅ Return an empty array on error
    }
  };
  
  export const createResidency = async (data, token) => {
    console.log(data)
    try{
      const res = await api.post(
        `/residency/create`,
        {
          data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    }catch(error)
    {
      throw error
    }
  }
