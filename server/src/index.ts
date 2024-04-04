import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { AppRouter } from "./appRouter";
import "./controllers/LoginController";
import "./controllers/RouteController";

import listEndpoints from "express-list-endpoints";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "*/*" }));
app.use(cookieSession({ keys: ["login"] }));
app.use(morgan("combined"));

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
  .then(() => {
    app.use(AppRouter.getInstance());

    const port = process.env.PORT || 3090;
    app.listen(port, () => {
      console.log("Listening on post ", port);
    });
    console.log(listEndpoints(app));
  })
  .catch((err) => console.log("Failed to connect to database: ", err));
