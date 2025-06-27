import mongoose from "mongoose";
const contentSchema = new mongoose.Schema(
  {
    title: String,
    platform: String, // YouTube | TikTok
    status: String, // Idea | Draft | Editing | Published
    tags: [String],
    notes: String,
    dueDate: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentSchema);
