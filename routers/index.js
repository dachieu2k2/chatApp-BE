const AuthRouter = require("./AuthRouter");
const RoomRouter = require("./RoomRouter");
const MessageRouter = require("./MessageRouter");


const router = (app) => {

  app.use("/api/users/", AuthRouter);

  app.use("/api/rooms/", RoomRouter);

  app.use("/api/messages/", MessageRouter);

}

module.exports = router;
