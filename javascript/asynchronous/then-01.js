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

function getJSON(url, errorMsg = 'Something went wrong') {
  // NOTE: make this helper function also return a promise
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${errorMsg}: ${res.status}`);
    return res.json();
  });
}

function getCountryAndNeighbour(country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      // NOTE: always return a promise and handle it outside to avoid callback hell
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Neighbour not found',
      );
    })
    .then((data) => renderCountry(data[0], 'neighbour'))
    .catch((err) => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
}

btn.addEventListener('click', () => getCountryAndNeighbour('taiwan'));
