'use strict';

import './style.css';

// const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderCountry(data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `
      <article class="country ${className}">
        <img class="country__img" src= "${data.flags.svg}">
        <div class="country__data">
          <h3 class="country__name"> ${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} million</p>         
          <p class="country__row"><span>🗣️</span>${languages[0]}</p>
          <p class="country__row"><span>💰</span>${currencies[0].name}</p>
        </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

function getCountryAndNeighbour(country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // this will fetch data in the background

  request.addEventListener('load', () => {
    const [data] = JSON.parse(request.responseText);

    // render country 1
    renderCountry(data);

    // get neighbour country 2
    const neighbour = data.borders?.[0];
    console.log(neighbour);
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', () => {
      const data2 = JSON.parse(request2.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
}

// getCountryAndNeighbour('japan');
getCountryAndNeighbour('india');
