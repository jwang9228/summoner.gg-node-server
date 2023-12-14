import mongoose from "mongoose";
const summonerSchema = new mongoose.Schema(
  {
    summonerName: String,
    summonerLevel: Number,
    summonerId: String,
    profileIconId: Number,
    puuid: String,
    server: {
      type: String,
      required: true,
      enum: [
        "na1",
        "euw1",
        "eun1",
        "kr",
        "jp1",
        "br1",
        "oc1",
        "la1",
        "la2",
        "ru1",
        "tr1",
      ],
      default: "na1",
    },
    matchIDs: [String],
    soloQueueRank: {
      win: Number,
      loss: Number,
      tier: String,
      rank: String,
      leaguePoints: Number,
    },
    flexQueueRank: {
      win: Number,
      loss: Number,
      tier: String,
      rank: String,
      leaguePoints: Number,
    },
    favoritedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
				username: String,
      },
    ],
  },
  { collection: "summoners" }
);
export default summonerSchema;
