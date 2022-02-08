require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const AuthRouter = require("./routers/AuthRouter");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.ppm9e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log(`connected DB`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users/", AuthRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("app started on PORT ", PORT));
