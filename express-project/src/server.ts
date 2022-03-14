import express from 'express';
import friendsRouter from './routes/friends.router';
import messagesRouter from "./routes/messages.router";
import imagesRouter from "./routes/images.router";

const app = express();

const PORT = 3000;

app.use(((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${delta}ms`);
}));

// http 모듈 쓸 때 body 를 항상 JSON.parse 했던 걸 미들웨어쓰면 자동으로 해준다.
// 또한 body 가 없으면 {} 빈 오브젝트를 body 에 심어주기 때문에 body null 체크를 할 필요도 없어졌다.
app.use(express.json());

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);
app.use('/images', imagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});