import * as client from './client.js';

function getRoutingValue(region) {
	const regionMap = new Map([
		['na1', 'americas'],
		['br1', 'americas'],
		['la1', 'americas'],
		['la2', 'americas'],
		['kr', 'asia'],
		['jp1', 'asia'],
		['eun1', 'europe'],
		['euw1', 'europe'],
		['tr1', 'europe'],
		['ru1', 'europe'],
		['oc1', 'sea'],
	]);
    return regionMap.get(region);
}

function SummonerRoutes(app) {
	app.get('/api/summoner/:region/:name', async (req, res) => {
		try {
			const { region, name } = req.params;
			const summonerData = await client.getSummonerByName(region, name);
			res.status(200).json(summonerData);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
	app.get('/api/summoner/matches/:region/:puuid/:matchCount', async (req, res) => {
		try {
			const { region, puuid, matchCount } = req.params;
			const routingValue = getRoutingValue(region);
			const summonerMatches = await client.getSummonerMatches(routingValue, puuid, matchCount);
			res.status(200).json(summonerMatches);
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
}
export default SummonerRoutes;
