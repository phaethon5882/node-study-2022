import express from 'express';

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
  delay(4000);
  res.send(`Beep beep bepp! ${process.pid}`);
});

// pm2 를 쓰면 마스터 프로세스를 자동으로 생성해주고 워커 프로세스들이 -i 옵션으로 준만큼 생성된다.
// pm2 start src/server.ts -i max -> 16개 워커 프로세스 생성됨!
// pm2 reload 를 쓰면 다운타임 없이 롤링으로 하나씩 재시작해줌
console.log('Running server.js...');
console.log('Worker process started...');
app.listen(3000);

