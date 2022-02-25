import { ControllerObj } from ".";

import { Message, User } from "../models";

const messageControllers: ControllerObj = {
  getMessages: async (req, res) => {
    const roomId = req.params.roomId;
    const messages = await Message.find({ roomId });
    const messagePromises = messages.map(async (message) => {
      const user = await User.findById(message.userId).select("-password");
      if (user) {
        const { username, email, avatar } = user;
        const { _id, userId, content, roomId, createdAt } = message;
        return {
          _id,
          userId,
          content,
          roomId,
          createdAt,
          user: {
            username,
            email,
            avatar,
          },
        };
      }
    });
    res.json(await Promise.all(messagePromises));
  },

  createMessage: async (req, res) => {
    const message = new Message({
      ...req.body,
      userId: req.userId,
    });
    await message.save();
    res.json(message);
  },

  editMessage: async (req, res) => {
    const messageId = req.params.idMessage;
    const message = await Message.findById(messageId);
    if (message) {
      if (req.userId !== message.userId) {
        res.json({
          message: "This message is not yours",
        });
      }
      message.content = req.body.content;
      await message.save();
      res.json(message);
    }
  },

  deleteMessage: async (req, res) => {
    const messageId = req.params.idMessage;
    const message = await Message.findById(messageId);
    if (message) {
      if (req.userId !== message.userId) {
        res.json({
          message: "This message is not yours",
        });
      }
    }
    const messageDeleted = await Message.findByIdAndDelete(messageId);
    // await message.remove();
    res.json(messageDeleted);
  },
};

export default messageControllers;
