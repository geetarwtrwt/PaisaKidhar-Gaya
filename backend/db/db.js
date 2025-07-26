import mongoose from "mongoose";
export let connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error connecting to database", err.message);
  }
};
