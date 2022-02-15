const AuthRouter = require("./AuthRouter");
const RoomRouter = require("./RoomRouter");
const MessageRouter = require("./MessageRouter");
const UserRouter = require("./UserRouter")

const verify = require("../middlewares/auth");

const router = (app) => {

  app.use("/api/auth/", AuthRouter);

  app.use("/api/users/", UserRouter);

  app.use("/api/rooms/",verify, RoomRouter);

  app.use("/api/messages/",verify, MessageRouter);

}

module.exports = router;
