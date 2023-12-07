import * as client from './client.js';

const MAXIMUM_RECENT_SEARCHES = 5;

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
	const addRecentSearch = async (req, res) => {
		if (!req.session["recentlySearched"]) {
			req.session["recentlySearched"] = [];
		}
		const searchData = req.body;
		const recentlySearched = req.session["recentlySearched"];
		const searchDataIndex = recentlySearched.findIndex(search => 
			(searchData.name === search.name && searchData.region === search.region));
		let newRecentSearch = null;
		if (searchDataIndex != -1) {
			const removedSearch = recentlySearched.splice(searchDataIndex, 1)[0];
			newRecentSearch = removedSearch;
		} else if (recentlySearched.length >= MAXIMUM_RECENT_SEARCHES) {
			recentlySearched.pop();
			newRecentSearch = searchData;
		} else {
			newRecentSearch = searchData;
		}
		recentlySearched.unshift(newRecentSearch);
		res.send(newRecentSearch);
	};

	const getRecentSearches = async (req, res) => {
		if (!req.session["recentlySearched"]) {
			req.session["recentlySearched"] = [];
		}
		res.send(req.session["recentlySearched"]);
	};

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
	app.post('/api/summoner/recentSearches', addRecentSearch); 
	app.get('/api/summoner/recentSearches', getRecentSearches);
}
export default SummonerRoutes;
