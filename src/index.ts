import express, { Express, Request, Response } from "express";

const app = express();
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import cors from "cors";
const corsOptions: ICorsOptions = {
  origin: [],
};

app.use(cors(corsOptions));

// import db from "./config/db";

// db.connectToDatabase();

app.set("view engine", "ejs");
app.use(express.static("public"));

import userRoute from "./routes/userRoutes";
import { ICorsOptions } from "./types/config";
app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello ts node");
});
const port: string = process.env.PORT as string;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
