'use strict';

import './style.css';

async function getJSON(url, errorMsg = 'Something went wrong') {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${errorMsg}: ${res.status}`);
  return res.json();
}

// NOTE: Promise.all([]): multiple async task that don't depends on each other.
async function get3Countries(c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log(data1.capital, data2.capital, data3.capital);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.error(err);
  }
}
get3Countries('japan', 'taiwan', 'canada');

// NOTE: Promise.race([]) short circuits whenever one of the promises gets settled.
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/japan`),
  ]);
  console.log(`race: three countries - ${res[0].name.common}`);
})();

function timeout(sec) {
  return new Promise((_, rej) =>
    setTimeout(() => rej(new Error('race: time limit')), sec * 1000),
  );
}

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),
  timeout(0.1),
])
  .then((res) => console.log(res[0].name.common))
  .catch((err) => console.error(err));

// NOTE: Promise.allSettled([]): never short circuits and return all the results
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then((res) => console.log(`allSettled: ${res}`));

// NOTE: Promise.any([]): short circuits whenever one of the promise RESOLVED
Promise.any([
  Promise.reject('error'),
  Promise.resolve('success'),
  Promise.resolve('another success'),
]).then((res) => console.log(`any: ${res}`));
