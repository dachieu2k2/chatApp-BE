const { User } = require('../models')

const userControllers = {
  getAllUserName: async (_req, res) => {
    const usernames = await User.find({}).select('username');
    res.json(usernames);
  }
}

module.exports = userControllers;
