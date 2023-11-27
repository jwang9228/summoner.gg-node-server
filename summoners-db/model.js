import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("summoners", schema);
export default model;