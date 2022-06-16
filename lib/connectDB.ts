import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connection.on("connected", () => {
    console.log("connected to mongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.log("db connection problem", err.message);
  });

  return mongoose.connect(process.env.MONGODB_URI!);
}

export default dbConnect;
