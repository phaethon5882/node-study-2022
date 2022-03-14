import express from 'express';

const app = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: '아인슈타인',
  },
  {
    id: 1,
    name: '윤키',
  },
];

app.use(((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
}));

// http 모듈 쓸 때 body 를 항상 JSON.parse 했던 걸 미들웨어쓰면 자동으로 해준다.
// 또한 body 가 없으면 {} 빈 오브젝트를 body 에 심어주기 때문에 body null 체크를 할 필요도 없어졌다.
app.use(express.json());

app.get('/', (req, res) => {
  // express 는 우리가 node 의 http 모듈을 썼던 때와 달리 send 의 타입을 보고 자동으로 Content-Type 헤더를 설정해준다.
  res.send({
    id: 1,
    name: 'yunki',
  });
});

app.get('/friends', (req, res) => {
  res.json(friends);
});

app.post('/friends', (req, res) => {
  if (!req.body.name) {
    // return 을 해줘야 56번째 줄 res.json 이 호출되지 않음.
    return res.status(400).json({
      error: 'name 값이 올바르지 않습니다.',
    });
  }

  const newFriend = {
    id: friends.length,
    name: req.body.name,
  };

  friends.push(newFriend);

  res.json(newFriend);
});

// GET /friends/22
app.get('/friends/:friendId', (req, res) => {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: 'Friend does not exist.'
    });
  }
});

app.get('/messages', ((req, res) => {
  res.send('<ul><li>Hello Yunki</li></ul>');
}));

app.post('/messages', (req, res) => {
  console.log('Updating messages....');
  req.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});