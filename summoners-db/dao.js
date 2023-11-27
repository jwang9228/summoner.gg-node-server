import model from "./model.js";

export const createSummoner = (summoner) => model.create(summoner);
export const findSummonerByPUUID = (summonerPUUID) => model.findById(summonerPUUID);