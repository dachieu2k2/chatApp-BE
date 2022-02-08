require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.occ7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log(`connected DB`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("app started on PORT ", PORT));
