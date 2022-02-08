const { Message } = require("../models");

const messageControllers = {
  getMessages: async (req, res) => {
    const roomId = req.params.id;
    const messages = await Message.find({ roomId });
    res.json(messages);
  },

  createMessage: async (req, res) => {
    const message = new Message(req.body);
    await message.save();
    res.json(message);
  },

  deleteMessage: async (req, res) => {
    const messageId = req.params.idMessage;
    await Message.findByIdAndDelete(messageId);
    res.json({
      message: "OK",
    })
  }
}

module.exports = messageControllers;
