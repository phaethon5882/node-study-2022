function promisify(callback: (...args: any[]) => any, delay: number) {
  return new Promise((resolve) => setTimeout(() => resolve(callback()), delay));
}

const a = () => promisify(() => 'a', 100);
const b = () => promisify(() => 'b', 0);
const c = () => promisify(() => 'c', 1000);

async function parallel() {
  const result = await Promise.all([a(), b(), c()]);
  console.log('parallel: \n', result);
  return result;
}

async function race() {
  const result = await Promise.race([a(), b(), c()]);
  console.log('race: \n', result);
  return result;
}

async function sequential() {
  const A = await a();
  const B = await b();
  const C = await c();

  console.log('sequential: \n', [A, B, C]);
  return [A, B, C];
}

parallel();
race();
sequential();