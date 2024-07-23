import { config } from "dotenv";
config();
import express, { Express } from "express";
import connectDB from "./connecttion";
import router from "./api";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;
const HOSTNAME = process.env.HOST as string;

const startApp = async () => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  connectDB();
  //Routes
  app.use("/api", router);

  //Scripts
  app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startApp();
