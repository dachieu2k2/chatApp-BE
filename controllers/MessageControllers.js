const { Message, User } = require("../models");

const messageControllers = {
  getMessages: async (req, res) => {
    const roomId = req.params.roomId;
    let messages = await Message.find({ roomId });
    messages = messages.map(async (message) => {
      const user = await User.findById(message.userId).select("-password");
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
    });
    res.json(await Promise.all(messages));
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
    if (req.userId !== message.userId) {
      res.json({
        message: "This message is not yours",
      });
    }
    message.content = req.body.content;
    await message.save();
    res.json(message);
  },

  deleteMessage: async (req, res) => {
    const messageId = req.params.idMessage;
    const message = await Message.findById(messageId);
    if (req.userId !== message.userId) {
      res.json({
        message: "This message is not yours",
      });
    }
    const messageDeleted = await Message.findByIdAndDelete(messageId);
    // await message.remove();
    res.json(messageDeleted);
  },
};

module.exports = messageControllers;
