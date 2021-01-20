import mongoose from "mongoose";

// connects Mongodb dataabse
export const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Mongodb connected: ${connection.connection.host}`.cyan);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold);
    // 1 here means exit with failure
    process.exit(1);
  }
};
