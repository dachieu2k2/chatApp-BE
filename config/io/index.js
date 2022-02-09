const { Server } = require("socket.io");
const http = require("http");

const connect = (app) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Connected ", socket.id);

    io.on("disconnect", () => {
      console.log("Disconnect ", socket.id);
    })
  })

  return server;
}

module.exports = {
  connect
}

