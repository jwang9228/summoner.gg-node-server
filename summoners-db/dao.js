import model from './model.js';

export const createSummoner = (summoner) => model.create(summoner);
export const findSummonerByServer = (server, summonerName) =>
	model.findOne({ server: server, summonerName: summonerName });
