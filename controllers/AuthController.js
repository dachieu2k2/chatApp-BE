const jwt = require("jsonwebtoken");
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
      console.log(FoundUser);
      if (!FoundUser) {
        return res.json({
          success: false,
          message: "please choose another name",
        });
      }
      const NewUser = new User({
        username,
        password,
        email,
      });
      await NewUser.save();
    } catch (error) {}
  },
};

module.exports = AuthController;
