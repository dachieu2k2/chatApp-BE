const mongoose = require("mongoose");

const { Room, Bind } = require("../models");

const roomControllers = {
  getRooms: async (req, res) => {
    const userId = req.userId;
    const roomIds = await Bind.find({ userId }, 'roomId');
    const rooms = roomIds.map(async (roomId) => {
      const room = await Room.findById({ _id: roomId });
      return room;
    });
    res.send(await Promise.all(rooms));
  }
}
