import http from "http";
import app from "./app";
import {loadPlanetsData} from "./models/planets.model";

const PORT = process.env.PORT || 8000;

// express() 의 반환값이 EventEmitter 이기 때문에 인자로 넘길 수 있음
// 이렇게 하는 이유는 웹소켓같은 http 리퀘스트 외의 다양한 요청을 처리할 수 있기 때문이다.
const server = http.createServer(app);

async function startServer() {
  // 행성 데이터 로딩 완료되면 요청을 받음
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

