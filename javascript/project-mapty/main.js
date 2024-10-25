'use strict';

import './style.css';
// import icon from './src/icon.png';
// import logo from './src/logo.png';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map; // private instance property
  #mapEvent; // private instance property

  /* NOTE: The useage of bind()
   *
   * The reason for all these bindings is to maintain the correct context `this`
   * when these methods are called as callbacks. In JavaScript, the value of `this` is
   * determined by how a function is called, not where it's defined.
   *
   * By using `bind` you're explicitly setting what `this` should be, regardless of
   * how the function is invoked.
   *
   * This approach ensures that methods always have access to the `App`  instance
   * and its properties/ methods, maintaining the integrity of OOP design.
   * */

  constructor() {
    this._getPosition();

    /* NOTE:  binding is necessary because when an event listener callback is invoked,
     * its `this` is set to the element that fired the event (in this case, the form).
     * By using `bind(this)`, you ensure that `this` inside `_newWorkout` refers to
     * the `App` instance, not the form element.
     * */
    form.addEventListener('submit', this._newWorkout.bind(this));

    /* NOTE: This binding is actually optional in the current implementation because
     * `_toggleElevationField` doesn't use `this`. However, it's included for
     * consistency and future-proofing in case `this` is needed later.
     */
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      /* NOTE: `getCurrentPosition` method calls its success callback as
       * a regular function, not as a method of your class.
       * Without binding, `this` inside `_loadMap` would be `undefined` (in strict mode)
       * or the global object. Binding ensures `this` refers to the `App` instance.
       */
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
        alert('Could not get your position.'),
      );
    }
  }

  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 16);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    /* NOTE: Similar to the first case,
     * event listeners in external libraries (like Leaflet.js here) may not preserve
     * the `this` context. Binding ensures that `this` in `_showForm` refers to
     * your `App` instance, not the map object.
     */
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // display marker AFTER the form submitted
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        }),
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
