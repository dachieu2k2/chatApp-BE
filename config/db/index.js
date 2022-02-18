const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL
    );
    console.log(`connected DB`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = {
  connect,
}
