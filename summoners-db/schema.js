import mongoose from "mongoose";
const summonerSchema = new mongoose.Schema({
    summonerName: { type: String, required: true },
    server: {
        type: String,
        required: true,
        enum: ["na1", "euw1", "eun1", "kr", "jp1", "br1", "oc1", "la1", "la2", "ru1", "tr1"],
        default: "na1", 
    },
    puuid: { type: String, required: true },
    matchIds: [String],
},
{ collection: "summoners" });
export default summonerSchema;