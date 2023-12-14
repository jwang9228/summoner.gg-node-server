import * as dao from './dao.js';

function SummonersRoutes(app) {
	const createSummoner = async (req, res) => {
		const summoner = await dao.createSummoner(req.body);
		res.json(summoner);
	};
	const updateSummoner = async (req, res) => {
		const updatedSummoner = await dao.updateSummoner(req.body);
		res.json(updatedSummoner);
	}
	const findSummonerByServer = async (req, res) => {
		const summoner = await dao.findSummonerByServer(
			req.params.server,
			req.params.summonerName
		);
		res.json(summoner);
	};

	app.post('/api/summoners', createSummoner);
	app.put('/api/summoners', updateSummoner);
	app.get('/api/summoners/:server/:summonerName', findSummonerByServer);
}
export default SummonersRoutes;
