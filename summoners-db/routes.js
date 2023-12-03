import * as dao from "./dao.js";

function SummonersRoutes(app) {
    const createSummoner = async (req, res) => {
        const summoner = await dao.createSummoner(req.body);
        res.json(summoner);
    };
    const findSummonerByServer = async (req, res) => {
        const summoner = await dao.findSummonerByServer(req.params.server, req.params.summonerName);
        res.json(summoner);
    };

    app.post("/api/summoners", createSummoner);
    app.get("/api/summoners/:server/:summonerName", findSummonerByServer);
}
export default SummonersRoutes;