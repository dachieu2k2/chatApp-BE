const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }

  try {
    const decode = jwt.verify(token, process.env.MY_SECRET_TOKEN);
    req.userId = decode.userId;
    // console.log(decode);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
