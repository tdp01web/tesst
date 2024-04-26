import mongoose from "mongoose";

export default async function connectMongoDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("Kết Nối Thành Công");
  } catch (error) {
    console.log("🚀 ~ connectMongoDB ~ error:", error);
  }
}
