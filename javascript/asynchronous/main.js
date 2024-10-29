'use strict';

import './style.css';

const countriesContainer = document.querySelector('.countries');

function renderError(msg) {
  countriesContainer.insertAdjacentText('beforebegin', msg);
}

function renderCountry(data, className = '') {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

function getPosition() {
  return new Promise((res, rej) => {
    /* NOTE: function reference forwarding
     *
     * When the parameters of a callback exactly match what you want to pass to
     * another function, you can just pass the function reference directly instead
     * of wrapping it in an arrow function.
     *
     * - geolocation succeeds: it calls the success callback with the position object,
     *   which gets passed directly to `res`
     * - geolocation fails: it calls the error callback with the error object,
     *   which gets passed directly to `rej`
     * */

    // navigator.geolocation.getCurrentPosition(
    //   (position) => res(position),
    //   (err) => rej(err),
    // );

    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

async function whereAmI() {
  try {
    // geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // reverse geocode
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // country data
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${dataGeo.countryCode}`,
    );
    if (!res.ok) throw new Error('Problem getting country data');
    const data = await res.json();

    // render country
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    /* NOTE: prpagating error up to the caller
     *
     * If you don't re-throw the error, the function will complete normally after
     * executing the catch block (function returns undefined)
     * - promise returned by the async function will resolve successfully (fulfill)
     * - trigger the `.then()` handler with `undefined`
     *
     * If you re-throw the error, you're explicitly making this error to continue
     * propagating.
     * - promise returned by the async function will be rejected
     * - trigger the `.catch()` handler
     *
     * Re-throwing is important when you want both local error handling and notifying
     * callers that an error occurred.
     * */

    // handle error locally
    console.error(err);
    renderError(`Something went wrong: ${err.message}`);

    // propagate error up to the caller
    throw err;
  }
}

// example for propagating error
console.log('1. first log');

whereAmI()
  .then((city) => console.log(`3. ${city}`))
  .catch((err) => console.error(`3. ${err.message}`))
  .finally(() => console.log('4. last log'));

// re-write .then() chain with IIFEs
// ;(async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`3. ${city}`);
//   } catch (err) {
//     console.error(`3. ${err.message}`);
//   }
//   console.log('4. last log');
// })();

console.log('2. second log');

// ------
// const btn = document.querySelector('.btn-country');
// btn.addEventListener('click', whereAmI);

const imgContainer = document.querySelector('.images');

function wait(sec) {
  return new Promise((res) => setTimeout(res, sec * 1000));
}

function createImage(imgPath) {
  return new Promise((res, rej) => {
    const img = document.createElement('img');
    img.src = imgPath;
    // res
    img.addEventListener('load', () => {
      res(img);
    });
    // rej
    img.addEventListener('error', () => {
      rej(new Error('Image not found'));
    });
  });
}

async function loadNPause(imagePath) {
  try {
    const img = await createImage(imagePath);
    imgContainer.append(img);
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
}

(async () => {
  await loadNPause('src/img-1.jpg');
  await loadNPause('src/img-2.jpg');
})();

// part 02
async function loadAll(imgArr) {
  try {
    const imgsPromise = imgArr.map(async (path) => await createImage(path));
    console.log(imgsPromise); // will return promise object, not img element

    const imgsEl = await Promise.all(imgsPromise);
    console.log(imgsEl);

    imgsEl.forEach((img) => {
      imgContainer.append(img);
      img.classList.add('parallel');
    });
  } catch (err) {
    console.error(err.message);
  }
}

loadAll(['src/img-1.jpg', 'src/img-2.jpg', 'src/img-3.jpg']);
