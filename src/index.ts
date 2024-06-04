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

app.set("view engine", "ejs");
app.use(express.static("public"));

import db from "./models";

db.sequelize.authenticate().then(() => {
  console.log("db connected");
});
import userRoute from "./routes/userRoutes";
import categoryRoute from "./routes/categoryRoutes";
import genreRoute from "./routes/genreRoutes";
import applicationRoute from "./routes/applicationRoutes";
import versionRoute from "./routes/versionRoutes";
import permissionRoute from "./routes/permissionRoutes";
import installedAppsRoutes from "./routes/installedAppsRoutes";
import developerRoute from "./routes/developerRoutes";
import ratingRoute from "./routes/ratingRoutes";
import { ICorsOptions } from "./types/config";

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/genre", genreRoute);
app.use("/application", applicationRoute);
app.use("/version", versionRoute);
app.use("/permission", permissionRoute);
app.use("/installedApps", installedAppsRoutes);
app.use("/developer", developerRoute);
app.use("/rating", ratingRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello ts node");
});

const port: string = process.env.PORT as string;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
