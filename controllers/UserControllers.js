const { User, Bind } = require("../models");

const userControllers = {
  getAllUserName: async (_req, res) => {
    const usernames = await User.find({}).select("username");
    res.json(usernames);
  },
  getAllUserNameFilter: async (req, res) => {
    const { roomId } = req.body;
    console.log(roomId);

    const userIds = await Bind.find({ roomId }).select("userId");
    console.log(userIds);
    const usernamesPromise = userIds.map(async ({ userId }) => {
      const username = await User.findById(userId).select("username");
      console.log(username);

      return username;
    });
    res.json(await Promise.all(usernamesPromise));
  },
};

module.exports = userControllers;
