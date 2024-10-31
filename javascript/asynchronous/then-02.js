'use strict';

import './style.css';

const btn = document.querySelector('.btn-country');
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
  // countriesContainer.style.opacity = 1;
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

function whereAmI() {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      );
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => renderError(err.message));
}

btn.addEventListener('click', whereAmI);
