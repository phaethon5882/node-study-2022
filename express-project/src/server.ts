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