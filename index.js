require("dotenv").config();
const express = require("express");
const morgan = require('morgan');

const router = require("./routers");
const db = require("./config/db");
const io = require("./config/io");

db.connect();

const app = express();
app.use(express.json());
app.use(morgan('combined'));

router(app);

const server = io.connect(app);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log("app started on PORT ", PORT));
