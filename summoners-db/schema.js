import mongoose from "mongoose";
const summonerSchema = new mongoose.Schema({
    summonerName: { type: String, required: true },
    puuid: { type: String, required: true, unique: true },
    matchIds: [String],
},
{ collection: "summoners" });
export default summonerSchema;