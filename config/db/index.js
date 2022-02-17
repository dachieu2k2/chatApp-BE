const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.ppm9e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log(`connected DB`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = {
  connect,
};
