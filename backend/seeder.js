import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import { connectDatabase } from "./DBConfig.js";

dotenv.config();

connectDatabase();

const importData = async () => {
  try {
    //   deletes all in db
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });
    await Product.insertMany(sampleProducts);
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
    await Order.deleteMany();
    await Product.deleteMany();
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
