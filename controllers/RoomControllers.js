const { Room, Bind, User } = require("../models");

const roomControllers = {
  getRooms: async (req, res) => {
    const userId = req.userId;
    const roomIds = await Bind.find({ userId }, "roomId");
    console.log(roomIds);
    const rooms = roomIds.map(async ({ roomId }) => {
      const room = await Room.findById(roomId);
      return room;
    });
    res.json(await Promise.all(rooms));
  },

  createRoom: async (req, res) => {
    const { friendNameList } = req.body;
    const room = new Room({ name: req.body.name });
    await room.save();
    const bind = new Bind({
      roomId: room._id,
      userId: req.userId,
    });
    await bind.save();
    friendNameList.forEach(async (friendName) => {
      const friend = await User.findOne({ username: friendName });
      const bindFriend = new Bind({
        roomId: room._id,
        userId: friend._id,
      });
      await bindFriend.save();
    });

    res.json(room);
  },

  editRoom: async (req, res) => {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    Object.keys(req.body).forEach(key => {
      room[key] = req.body[key]
    })
    await room.save();
    res.json(room);
  },

  deleteRoom: async (req, res) => {
    const roomId = req.params.id;
    const userId = req.userId;
    await Bind.findOneAndDelete({ roomId, userId });
    res.json({
      message: "OK",
    });
  },

  invite: async (req, res) => {
    const { friendNameList, roomId } = req.body;
    const room = await Room.findById(roomId);

    friendNameList.forEach(async (friendName) => {
      const friend = await User.findOne({ username: friendName });
      const friendBind = new Bind({
        roomId,
        userId: friend._id,
      });
      await friendBind.save();
    });
    res.json(room);
  },
};

module.exports = roomControllers;
