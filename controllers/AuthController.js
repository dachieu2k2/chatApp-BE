const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const AuthController = {
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({ success: false, message: "sign the username or password" });
    }
    try {
      const FoundUser = User.findOne({ username });
      if (FoundUser)
        res.json({ success: false, message: "please choose another name" });
    } catch (error) {}
    console.log(req.body);
  },
  registerUser: async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.json({
        success: false,
        message: "sign the username, password or email",
      });
    }
    try {
      const FoundUser = await User.findOne({ username });
      if (FoundUser) {
        return res.json({
          success: false,
          message: "please choose another name",
        });
      }
      let hashPassword;
      await bcrypt
        .hash(password, parseInt(process.env.saltRounds))
        .then((hash) => {
          hashPassword = hash;
        });
      const NewUser = new User({
        username,
        password: hashPassword,
        email,
      });

      await NewUser.save();

      //   console.log(process.env.MY_SECRET_TOKEN, NewUser._id);
      const accessToken = jwt.sign(
        { userId: NewUser._id },
        process.env.MY_SECRET_TOKEN,
        {
          expiresIn: "15d",
        }
      );
      return res.json({
        success: true,
        message: "Congratulation!",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

module.exports = AuthController;
