import express from 'express';
import AuthRouter from "./AuthRouter";
import RoomRouter from "./RoomRouter";
import MessageRouter from "./MessageRouter";
import UserRouter from "./UserRouter";

import verify from "../middlewares/auth";

const router = (app: ReturnType<typeof express>) => {

  app.use("/api/auth/", AuthRouter);

  app.use("/api/users/", UserRouter);

  app.use("/api/rooms/",verify, RoomRouter);

  app.use("/api/messages/",verify, MessageRouter);

}

export default router;

