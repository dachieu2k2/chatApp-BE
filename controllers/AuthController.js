const jwt = require("jsonwebtoken");

const AuthController = {
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({ success: false, message: "sign the username or password" });
    }
    try {
    } catch (error) {}
    console.log(req.body);
  },
};

module.exports = AuthController;
