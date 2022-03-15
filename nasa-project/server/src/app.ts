import path from "path";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import planetsRouter from "./routes/planets/planets.router";
import launchesRouter from "./routes/launches/launches.router";

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

export default app;