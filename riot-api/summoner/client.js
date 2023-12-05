import axios from 'axios';
import 'dotenv/config';

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const RIOT_API_SUMMONER_V4_URL = 'api.riotgames.com/lol/summoner/v4/summoners/by-name';
const RIOT_API_MATCH_V5_URL = 'api.riotgames.com/lol/match/v5/matches';

export const getSummonerByName = async (region, summonerName) => {
	const queryURL = `https://${region}.${RIOT_API_SUMMONER_V4_URL}/${summonerName}`;
	const response = await axios.get(queryURL, {
		headers: {
			'X-Riot-Token': RIOT_API_KEY,
		},
	});
	return response.data;
};
export const getSummonerMatches = async (routingValue, puuid, matchCount) => {
	const queryURL = `https://${routingValue}.${RIOT_API_MATCH_V5_URL}/by-puuid/${puuid}/ids?start=0&count=${matchCount}`;
	const response = await axios.get(queryURL, {
		headers: {
			'X-Riot-Token': RIOT_API_KEY,
		},
	});
	return response.data;
};