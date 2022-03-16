import http from "http";
import mongoose from "mongoose";
import app from "./app";
import {loadPlanetsData} from "./models/planets.model";
import {getMongoURL} from "./utils/config";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(getMongoURL());
  // 행성 데이터 로딩 완료되면 요청을 받음
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();


