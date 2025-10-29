import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// auth route
import authroutes from "./routes/authRoutes.js";
app.use("/api", authroutes);

//admin route
import adminroute from "./routes/adminRoutes.js";
app.use("/api/admin", adminroute);

// common route
import commonroute from "./routes/commonRoutes.js";
app.use("/api/common", commonroute);
// mongo db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongo db connect sussfully");

    //   server listinng
    app.listen(PORT, () => {
      console.log(`server is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongo db connected sussfully :", error);
    process.exit(1);
  });
