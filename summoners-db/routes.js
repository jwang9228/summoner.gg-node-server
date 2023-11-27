import * as dao from "./dao.js";

function SummonersRoutes(app) {
    const createSummoner = async (req, res) => {
        const summoner = await dao.createSummoner(req.body);
        res.json(summoner);
    };
    app.post("/api/summoners", createSummoner);
}
export default SummonersRoutes;