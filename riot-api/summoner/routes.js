import * as client from "./client.js";

function SummonerRoutes(app) {
    app.get("/api/summoner/:region/:name", async (req, res) => {
        try {
            const { region, name } = req.params;
            const summonerData = await client.getSummonerByName(region, name);
            res.status(200).json(summonerData);
        } catch (error) {
            console.error("Error fetching summoner data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });    
}
export default SummonerRoutes;