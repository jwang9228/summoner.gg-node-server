import express from 'express';
import SummonerRoutes from './riot-api/summoner/routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

SummonerRoutes(app);

app.listen(4000);
