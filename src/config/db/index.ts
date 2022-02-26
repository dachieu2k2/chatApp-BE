import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.ppm9e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log(`connected DB`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      process.exit(1);
    }
  }
};

export {
  connect
}
