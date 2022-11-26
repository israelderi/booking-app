import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

//Create hotel
router.post("/", verifyAdmin, createHotel);

//Update hotel
router.put("/:id", verifyAdmin, updateHotel);

//Delete hotel
router.delete("/:id", verifyAdmin, deleteHotel);

//Get hotel
router.get("/find/:id", getHotel);

//Get all hotels
router.get("/", getHotels);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getHotelRooms);

export default router;