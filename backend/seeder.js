import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import { users } from "./data/users.js";
import User from "./models/User.js";
import { connectDatabase } from "./DBConfig.js";
import Post from "./models/Post.js";
import posts from "./data/posts.js";

dotenv.config();

connectDatabase();

const importData = async () => {
  try {
    //   deletes all collections in the db before seeding the db
    await Post.deleteMany();
    await User.deleteMany();
    // injects all the users array into the db
    const createdUsers = await User.insertMany(users);
    const userId = createdUsers[0]._id;
    const samplePost = posts.map((post) => {
      return { ...post, user: userId };
    });
    await Post.insertMany(samplePost);
    console.log("Data Imported ".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`.red.inverse);
    process.exit(1);
  }
};

const destryoyData = async () => {
  try {
    //   deletes all in db
    await Post.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed ".red.inverse);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destryoyData();
} else {
  importData();
}
