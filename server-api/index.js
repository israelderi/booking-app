import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB);
      console.log("Connected to MONGO.DB !");
    } catch (error) {
      throw error;
    }
  };


app.use("/api/auth", authRoute); 
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


app.listen(process.env.PORT, ()=>{
    connectDB()
    console.log("connected to backend server")
})