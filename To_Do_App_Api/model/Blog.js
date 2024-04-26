import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  startDay: {
    type: Date,
  },
  endDay: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["đang làm", "chưa làm", "làm chậm", "hoàn thành"],
    default: "chưa làm",
  },
});

export default mongoose.model("Blog", blogSchema);
