const { Room, Bind } = require("../models");

const roomControllers = {
  getRooms: async (req, res) => {
    const userId = req.userId;
    const roomIds = await Bind.find({ userId }, 'roomId');
    const rooms = roomIds.map(async (roomId) => {
      const room = await Room.findById({ _id: roomId });
      return room;
    });
    res.json(await Promise.all(rooms));
  },

  createRoom: async (req, res) => {
    const room = new Room(req.body);
    await room.save();
    res.json(room);
  },

  editRoom: async (req, res) => {
    const roomId = req.params.id;
    const room = Room.findById(roomId);
    room.name = req.body.name;
    await room.save();
    res.json(room);
  },

  deleteRoom: async (req, res) => {
    const roomId = req.params.id;
    await Bind.findOneAndDelete({ roomId });
    res.json({
      message: "OK",
    })
  }
}

module.exports = roomControllers;
