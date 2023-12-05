import express from "express";
import SummonerRoutes from "./riot-api/summoner/routes.js";
import SummonersRoutes from "./summoners-db/routes.js";
import UserRoutes from "./users/routes.js";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const dbName = "summoner-gg";
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const DB_LOCAL_STRING = `mongodb://127.0.0.1:27017/${dbName}`;

process.env.DB_CONNECTION_STRING
	? mongoose.connect(DB_CONNECTION_STRING, { dbName: dbName })
	: mongoose.connect(DB_LOCAL_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionOptions));
app.use(express.json());

SummonerRoutes(app);
SummonersRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);
