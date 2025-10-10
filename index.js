import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
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
