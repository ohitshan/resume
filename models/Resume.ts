import mongoose from "mongoose";
import { Schema } from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 60,
    },
    content: {
      type: String,
    },
    education: {
      type: String,
    },
    field: {
      type: String,
    },
    part: {
      type: Array || String,
    },
    career: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
