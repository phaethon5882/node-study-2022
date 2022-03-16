import express from 'express';
import cluster from 'cluster';
import os from 'os';

const app = express();

function delay(duration: number) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    // event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send(`Performance example ${process.pid}`);
});

app.get('/timer', (req, res) => {
  // delay the response
  delay(9000);
  res.send(`Ding ding ding! ${process.pid}`);
});


console.log('Running server.js...');
if (cluster.isPrimary) {
  // 워커가 16개 돌아가니까 동시에 16개 처리를 할 수 있음.
  // 논리 프로세서 개수, 나의 경우는 16(8 * 2)개
  const NUM_WORKERS = os.cpus().length;

  console.log('Master has been started...');
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log('Worker process started...');
  app.listen(3000);
}

