import model from './model.js';

export const createSummoner = (summoner) => model.create(summoner);
export const updateSummoner = (updatedSummoner) => 
	model.updateOne({ server: updatedSummoner.server, summonerName: { $regex: new RegExp(`^${updatedSummoner.summonerName}$`, 'i') } }, { $set: updatedSummoner});
export const findSummonerByServer = (server, summonerName) =>
	model.findOne({ server: server, summonerName: { $regex: new RegExp(`^${summonerName}$`, 'i') } });
