const { Server } = require("socket.io");
const { User } = require("../../models");
const http = require("http");

const connect = (app) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Connected ", socket.id);

    socket.on("leave room", ({ roomId }) => {
      socket.leave(roomId);
      console.log(`${socket.id} leave room ${roomId}`);
    });

    socket.on("join room", ({ roomId }) => {
      socket.join(roomId);
      console.log(`${socket.id} join room ${roomId}`);
    });

    socket.on("create room", ({ username, ...rest }) => {
      User.findOne({ username }).then((user) => {
        socket.broadcast.emit("update room", user._id, rest);
      });
    });
    socket.on("create message", ({ roomId, ...action }) => {
      socket.to(roomId).emit("update message", action);
    });

    io.on("disconnect", () => {
      console.log("Disconnect ", socket.id);
    });
  });

  return server;
};

module.exports = {
  connect,
};
