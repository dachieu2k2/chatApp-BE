import dotenv from "dotenv";
import express from "express";
// import morgan from "morgan";
import cors from "cors";

import router from "./routers";
import * as db from "./config/db";
import * as io from "./config/io";

dotenv.config();

db.connect();

const app = express();
app.use(express.json({limit: 2097152}));
app.use(cors({
  origin: '*'
}));
// app.use(morgan("combined"));

router(app);

const server = io.connect(app);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log("app started on PORT ", PORT));
