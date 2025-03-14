import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: "https://rayyan-estate-server.vercel.app/api",
});

/**
 * Fetch token silently and attach it to headers.
 */
const getAuthHeaders = async (getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently();
        return { Authorization: `Bearer ${token}` };
    } catch (error) {
        console.error("Error fetching token:", error);
        return {}; // Return empty headers if token fetch fails
    }
};

/**
 * Persist user data after login and refresh.
 */
export const persistUser = (user) => {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
};

export const getUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
};

/**
 * Fetch all properties
 */
export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd", { timeout: 10000 });
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
};

/**
 * Fetch single property details
 */
export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residency/${id}`, { timeout: 10000 });
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        throw error;
    }
};

/**
 * Register a new user
 */
export const createUser = async (email, getAccessTokenSilently) => {
    try {
        const headers = await getAuthHeaders(getAccessTokenSilently);
        await api.post("/user/register", { email }, { headers });
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

/**
 * Book a visit
 */
export const bookVisit = async (date, propertyId, email, getAccessTokenSilently) => {
    try {
        const headers = await getAuthHeaders(getAccessTokenSilently);
        await api.post(`/user/bookVisit/${propertyId}`, {
            email,
            id: propertyId,
            date: dayjs(date).format("DD/MM/YYYY"),
        }, { headers });
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

/**
 * Remove booking
 */
export const removeBooking = async (id, email, getAccessTokenSilently) => {
    try {
        const headers = await getAuthHeaders(getAccessTokenSilently);
        await api.post(`/user/removeBooking/${id}`, { email }, { headers });
    } catch (error) {
        toast.error("Something went wrong, Please try again");
        throw error;
    }
};

/**
 * Add to favorites
 */
export const toFav = async (id, email, getAccessTokenSilently) => {
    try {
        const headers = await getAuthHeaders(getAccessTokenSilently);
        await api.post(`/user/toFav/${id}`, { email }, { headers });
    } catch (error) {
        throw error;
    }
};

/**
 * Fetch all favorite properties
 */
export const getAllFav = async (email, getAccessTokenSilently) => {
    if (!email) {
        console.error("Missing email, cannot fetch favorites.");
        return [];
    }

    try {
        const headers = await getAuthHeaders(getAccessTokenSilently);
        const res = await api.post(`/user/allFav`, { email }, { headers });

        return res.data?.favResidenciesID || [];
    } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Something went wrong while fetching favorites");
        return [];
    }
};

/**
 * Fetch all bookings
 */
export const getAllBookings = async (email, getAccessTokenSilently) => {
    if (!email) return [];

    try {
        const headers = await getAuthHeaders(getAccessTokenSilently);
        const res = await api.post(`/user/allBookings`, { email }, { headers });

        return res.data?.bookedVisits || [];
    } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Something went wrong while fetching bookings");
        return [];
    }
};

/**
 * Create a new property listing
 */
export const createResidency = async (data, getAccessTokenSilently) => {
    try {
        const headers = await getAuthHeaders(getAccessTokenSilently);
        await api.post(`/residency/create`, { data }, { headers });
    } catch (error) {
        throw error;
    }
};
