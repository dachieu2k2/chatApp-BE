const AuthRouter = require("./AuthRouter");
const RoomRouter = require("./RoomRouter");
const MessageRouter = require("./MessageRouter");
const verify = require("../middlewares/auth");

const router = (app) => {

  app.use("/api/users/", AuthRouter);

  app.use("/api/rooms/",verify, RoomRouter);

  app.use("/api/messages/",verify, MessageRouter);

}

module.exports = router;
