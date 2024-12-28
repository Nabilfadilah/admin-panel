import mongoose from "mongoose";

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected.");
    return mongoose.connection.asPromise();
  }

  console.log("Connecting to MongoDB...");
  return mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log("MongoDB connected successfully.");
  }).catch(err => {
    console.error("MongoDB connection error:", err);
    throw new Error("Failed to connect to MongoDB.");
  });
};
