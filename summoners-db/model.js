import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Summoner", schema);
export default model;