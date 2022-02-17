const { Server } = require("socket.io");
const { User, Bind } = require("../../models");
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

    socket.on("create room", ({ friendNameList, ...action }) => {
      const allFriendIdPromise = friendNameList.map(async (friendName) => {
        const user = await User.findOne({ username: friendName });
        return user._id;
      });

      Promise.all(allFriendIdPromise).then((allFriendId) => {
        io.emit("update room", allFriendId, action);
      });
    });

    socket.on("create message", ({ roomId, ...action }) => {
      User.findById(action.payload.userId)
        .select("-password")
        .then((user) => {
          const { username, email, avatar } = user;
          io.to(roomId).emit("update message", {
            ...action,
            payload: {
              ...action.payload,
              user: {
                username,
                email,
                avatar,
              },
            },
          });
        });
    });

    socket.on("update newest message", ({ roomId, ...action }) => {
      Bind.find({ roomId }).then(res => {
        const userIds = res.map(item => item.userId);
        User.findById(action.payload.userId)
          .select("username")
          .then(user => {
            io.emit("update room", userIds,{
              ...action,
              payload: {
                ...action.payload,
                user: {
                  username: user.username
                }
              }
            })
          })
      })
    })

    io.on("disconnect", () => {
      console.log("Disconnect ", socket.id);
    });
  });

  return server;
};

module.exports = {
  connect,
};
