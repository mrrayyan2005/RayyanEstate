import express from "express";
import jwtCheck from "../config/auth0Config.js";
import {getAllFavorites, toFav,getAllBookings,createUser ,bookVisit,cancelBooking} from "../controllers/userCntrl.js";
const router=express.Router();
router.post("/register",jwtCheck,createUser);
router.post("/bookVisit/:id",jwtCheck,bookVisit)
router.post("/allBookings",getAllBookings)
router.post("/removeBooking/:id",jwtCheck,cancelBooking)
router.post("/toFav/:rid",jwtCheck,toFav)
router.post("/allFav",jwtCheck,getAllFavorites)
export {router as userRoute}
