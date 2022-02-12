const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const AuthController = {
  getUser: async (req, res) => {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    res.json({
      success: true,
      info: user,
    });
  },

  refresh: async (req, res) => {
    const refreshToken = req.body.token;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user.refreshToken !== refreshToken) {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const newAccessToken = jwt.sign({ userId }, process.env.MY_SECRET_TOKEN, {
      expiresIn: "60d",
    });
    res.json({
      success: true,
      accessToken: newAccessToken,
    });
  },

  loginUser: async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        success: false,
        message: "sign the username or password",
      });
    }
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect user or password",
        });
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        return res.json({
          success: false,
          message: "Incorrect user or password",
        });
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.MY_SECRET_TOKEN,
        {
          expiresIn: "60s",
        }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.MY_REFRESH_TOKEN
      );
      const userInDb = await User.findById(user._id);
      userInDb.refreshToken = refreshToken;
      await userInDb.save();

      return res.status(200).json({
        success: true,
        message: "Congratulation!Login success ",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
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
          expiresIn: "60s",
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
