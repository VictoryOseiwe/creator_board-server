import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  //   googleId: String,
  //   name: String,
  //   email: String,
  //   avartar: String,

  googleId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Often email should also be unique
  },
  avatar: {
    // Or avartar if that's what you used
    type: String,
  },
});

export default mongoose.model("User", userSchema);
