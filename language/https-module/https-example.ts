import { get, request } from 'https';

// request 는 request 객체의 end() 메서드를 호출해줘야 요청이 끝난다.
// (() => {
//   const req = request('https://www.google.com', (res) => {
//     // res 객체는 ReadableStream 인데 이게 또 EventEmitter 를 상속한다.
//     res.on('data', (dataChunk) => {
//       console.log({ dataChunk });
//     });
//     res.on('end', () => console.log('No more data...'));
//   });
//   req.end();
// })();

(() => {
  get('https://www.google.com', (res) => {
    res.on('data', (dataChunk) => {
      console.log({ dataChunk });
    });
    res.on('end', () => console.log('No more data...'));
  });
})();