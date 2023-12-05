import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["Player", "Admin"],
      default: "Player",
      required: true,
    },
    position: {
      type: String,
      enum: ["Top", "Jungle", "Mid", "Bot", "Support", "Fill"],
      default: "Fill",
      required: true,
    },
  },
  { collection: "users" }
);
export default userSchema;
