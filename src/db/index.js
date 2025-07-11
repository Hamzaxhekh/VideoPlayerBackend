import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    console.log(process.env.MONGODB_URL, "URL");

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`\n Mongo Db Connected t ${connectionInstance}`);
  } catch (error) {
    console.log(error, "Error");
    process.exit(1);
  }
};

export default connectDb;
