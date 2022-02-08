const AuthRouter = require("./AuthRouter");
const RoomRouter = require("./RoomRouter");


const router = (app) => {

  app.use("/api/users/", AuthRouter);

  app.use("/api/rooms/", RoomRouter);

}

module.exports = router;
