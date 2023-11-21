import axios from 'axios';
import 'dotenv/config';

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const RIOT_API_SUMMONER_V4_URL =
	'api.riotgames.com/lol/summoner/v4/summoners/by-name';

export const getSummonerByName = async (region, summonerName) => {
	const queryURL = `https://${region}.${RIOT_API_SUMMONER_V4_URL}/${summonerName}`;
	const response = await axios.get(queryURL, {
		headers: {
			'X-Riot-Token': RIOT_API_KEY,
		},
	});
	return response.data;
};
