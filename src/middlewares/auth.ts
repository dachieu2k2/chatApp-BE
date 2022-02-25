import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SignData } from "../controllers";

interface Middleware1 {
  (req: Request & { userId?: string}, res: Response, next: NextFunction): unknown | Promise<unknown> 
};



const verifyToken: Middleware1 = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }

  try {
    const decode = jwt.verify(token, process.env.MY_SECRET_TOKEN as jwt.Secret) as SignData;
    req.userId = decode.userId.toString();
    // console.log(decode);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Invalid token" });
  }
};

export default verifyToken;

