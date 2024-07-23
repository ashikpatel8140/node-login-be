import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log("connection establized...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
