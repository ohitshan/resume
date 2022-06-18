import mongoose from "mongoose";
import { Schema } from "mongoose";

const SuggestionSchema = new mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    content: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Suggestion ||
  mongoose.model("Suggestion", SuggestionSchema);
