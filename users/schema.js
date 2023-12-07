import mongoose from "mongoose";
import championsList from "./champions.json" assert { type: 'json' };

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
      enum: ["", "Top", "Jungle", "Mid", "Bot", "Support", "Fill"],
      validate: {
        validator: function (value) {
          if (this.role === "Player") {
            return value && value.length > 0;
          } else {
            return value === "";
          }
        },
        message: "Position required for players",
      },
    },
    links: {
      type: {
        Twitter: {
          type: String,
          trim: true,
          default: "",
        },
        Twitch: {
          type: String,
          trim: true,
          default: "",
        },
        Youtube: {
          type: String,
          trim: true,
          default: "",
        },
        Instagram: {
          type: String,
          trim: true,
          default: "",
        },
      },
      default: {
        Twitter: "",
        Twitch: "",
        Youtube: "",
        Instagram: "",
      },
    },
    champion: {
      type: String,
      enum: championsList,
    },
    summonerName: {
      type: String
    },
    region: {
      type: String,
      enum: ["BR1", "EUN1", "EUW1", "JP1", "KR", "LA1", "LA2", "NA1", "OC1", "RU", "TR1"],
    }
  },
  { collection: "users" }
);
export default userSchema;
