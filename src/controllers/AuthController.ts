import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import { ControllerObj, SignData } from ".";

const AuthController: ControllerObj = {
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
    if (user) {
      if (user.refreshToken !== refreshToken) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }
      const newAccessToken = jwt.sign({ userId }, process.env.MY_SECRET_TOKEN as jwt.Secret, {
        expiresIn: "60d",
      });
      return res.json({
        success: true,
        accessToken: newAccessToken,
      });
    }
    res.json({
      success: false,
      message: 'User not found'
    })
  },

  loginUser: async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        success: false,
        message: "Sign the username or password",
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
        { userId: user._id } as SignData,
        process.env.MY_SECRET_TOKEN as jwt.Secret,
        {
          expiresIn: "60d",
        }
      );
      const refreshToken = jwt.sign(
        { userId: user._id } as SignData,
        process.env.MY_REFRESH_TOKEN as jwt.Secret
      );
      const userInDb = await User.findById(user._id);
      if (userInDb) {
        userInDb.refreshToken = refreshToken;
        await userInDb.save();
      }
      return res.status(200).json({
        success: true,
        message: "Congratulation! Login success ",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
  registerUser: async (req, res) => {
    const { username, password, email, avatar } = req.body;
    if (!username || !password || !email) {
      return res.json({
        success: false,
        message: "Sign the username, password and email",
      });
    }
    try {
      const FoundUser = await User.findOne({ username });
      if (FoundUser) {
        return res.json({
          success: false,
          message: "Please choose another name",
        });
      }
      // const validateEmail = (email) => {
      //   return String(email)
      //     .toLowerCase()
      //     .match(
      //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //     );
      // };
      // if (!validateEmail(email)) {
      //   res.json({ success: false, message: "this is not email" });
      // }
      // const FoundEmail = await User.findOne({ email });
      // if (FoundEmail) {
      //   res.json({
      //     success: false,
      //     message: "Please choose another email",
      //   });
      // }
      // if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
      //   res.json({
      //     success: false,
      //     message:
      //       "Password should contains at least 8 from the mentioned characters, one upper case, one lower case, one digit",
      //   });
      // }

      let hashPassword;
      await bcrypt
        .hash(password, parseInt(process.env.saltRounds ?? '10'))
        .then((hash) => {
          hashPassword = hash;
        });
      const NewUser = new User({
        username,
        password: hashPassword,
        email,
        avatar,
      });

      await NewUser.save();

      //   console.log(process.env.MY_SECRET_TOKEN, NewUser._id);
      const accessToken = jwt.sign(
        { userId: NewUser._id } as SignData,
        process.env.MY_SECRET_TOKEN as jwt.Secret,
        {
          expiresIn: "60d",
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

export default AuthController;

