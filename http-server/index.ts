import http from 'http';

const PORT = 3000;

// const server = http.createServer(((req, res) => {
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });
//   res.end(JSON.stringify({
//     id: 1,
//     name: 'Sir Isaac Newton',
//   }));
// }));

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: '아인슈타인',
  },
  {
    id: 1,
    name: '뉴턴',
  },
  {
    id: 2,
    name: '라부아지에',
  },
]

server.on('request', (req, res) => {
  // /friends/2 ===> '', 'friends', '2'
  const [, collection, ...variables] = (req.url ?? '').split('/');

  if (req.method === 'POST' && collection === 'friends') {
    req.on('data', (data) => {
      const friend = JSON.parse(data) as typeof friends[number];
      console.log('Request: ', friend);
      if (friend?.name) {
        friends.push({
          id: friends.length,
          name: friend.name
        });
      }
    });
    // req 스트림을 res 로 보내면, body 가 응답값으로 전달됨.
    req.pipe(res);
  } else if (req.method === 'GET' && collection === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const [index] = variables;
    if (!index) {
      res.end(JSON.stringify(friends));
    } else if (Number(index) >= 0 && friends[+index]) {
      res.end(JSON.stringify(friends[+index]));
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else if (collection === 'messages') {
    /**
     * res.statusCode = 200;
     * res.setHeader('Content-Type', 'text/html');
     * 는 아래와 같음, 그런데 헤더를 조건에 따라 분기할 수 없어서 위에걸 더 많이 쓰는 것 같음
     *
     * res.writeHead(200, {
     *   'Content-Type': 'application/json',
     * });
     */
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
      res.write('<li>Hello Isaac!</li>');
      res.write('<li>What are tour thoughts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
}); // 127.0.0.1 => localhost