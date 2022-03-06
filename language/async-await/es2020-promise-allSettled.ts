const jobOne = new Promise((resolve) => setTimeout(resolve, 3000));
const jobTwo = new Promise((_, reject) => setTimeout(reject, 6000));

(async () => {
  const [one, two] = await Promise.allSettled([jobOne, jobTwo]);
  console.log({ one, two });
})();

(async () => {
  try {
    const [one, two] = await Promise.all([jobOne, jobTwo]);
    console.log({ one, two });
  } catch (e) {
    console.log('Something went wrong.', e);
  }
})();
