import { ControllerObj } from '.';

import { Room, Bind, User, I_Room } from '../models';

const roomControllers: ControllerObj = {
  getRooms: async (req, res) => {
    const userId = req.userId;
    const roomIds = await Bind.find({ userId }, 'roomId');
    const rooms = roomIds.map(async ({ roomId }) => {
      const room = await Room.findById(roomId);
      return room;
    });
    res.json(await Promise.all(rooms));
  },

  createRoom: async (req, res) => {
    const { friendNameList } = <{ friendNameList: string[] }>req.body;
    const room = new Room({ name: req.body.name });
    await room.save();
    const bind = new Bind({
      roomId: room._id,
      userId: req.userId,
    });
    await bind.save();
    friendNameList.forEach(async (friendName) => {
      const friend = await User.findOne({ username: friendName });
      if (friend) {
        const bindFriend = new Bind({
          roomId: room._id,
          userId: friend._id,
        });
        await bindFriend.save();
      }
    });

    res.json(room);
  },

  editRoom: async (req, res) => {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    const body = <Partial<I_Room>>req.body;
    if (room) {
      await room.update(body);
      await room.save();
      res.json(room);
    }
  },

  deleteRoom: async (req, res) => {
    const roomId = req.params.id;
    const userId = req.userId;
    const roomDeleted = await Bind.findOneAndDelete({ roomId, userId });
    res.json(roomDeleted);
  },

  invite: async (req, res) => {
    const { friendNameList, roomId } = <
      { friendNameList: string[]; roomId: string }
    >req.body;
    const room = await Room.findById(roomId);

    friendNameList.forEach(async (friendName) => {
      const friend = await User.findOne({ username: friendName });
      if (friend) {
        const friendBind = new Bind({
          roomId,
          userId: friend._id,
        });
        await friendBind.save();
      }
    });
    res.json(room);
  },
};

export default roomControllers;
