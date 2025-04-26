import "./sass/style.scss";

("use strict");

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".btn-close-modal");
const btnsOpenModal = document.querySelectorAll(".btn-show-modal");
const btnLeft = document.querySelector(".slider-btn-left");
const btnRight = document.querySelector(".slider-btn-right");

const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector(".nav");
const dotsContainer = document.querySelector(".dots");

const header = document.querySelector(".header");
const navHeight = navLinks.getBoundingClientRect().height;

const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");

const slides = document.querySelectorAll(".slide");
const maxSlides = slides.length;
let currentSlide = 0;

function createDots() {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots-dot" data-slide=${i}></button>`,
    );
  });
}

function activateDot(slide) {
  document
    .querySelectorAll(".dots-dot")
    .forEach((dot) => dot.classList.remove("dots-dot-active"));
  document
    .querySelector(`.dots-dot[data-slide='${slide}']`)
    .classList.add("dots-dot-active");
}

function openModal(event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function navScroll(event) {
  event.preventDefault();
  // console.log(this, event.target);

  if (event.target.classList.contains("nav-link")) {
    const id = event.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    // console.log(id);
  }
}

function activateTab(event) {
  event.preventDefault();

  // prevent the target become other child elements
  const clicked = event.target.closest(".operations-tab");

  if (!clicked) return;

  // clear all active class
  document.querySelectorAll(".operations-tab").forEach((tab) => {
    tab.classList.remove("operations-tab-active");
  });
  document.querySelectorAll(".operations-content").forEach((content) => {
    content.classList.remove("operations-content-active");
  });

  // add active class to clicked
  clicked.classList.add("operations-tab-active");
  document
    .querySelector(`.operations-content-${clicked.dataset.tab}`)
    .classList.add("operations-content-active");
}

function hoverNav(event, opacity) {
  console.log(this); // this would be the argument passed into bind()

  const link = event.target;

  if (link.classList.contains("nav-link")) {
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

function hoverNavBind(event) {
  // console.log(this); // this would be the argument passed into bind()

  const link = event.target;

  if (link.classList.contains("nav-link")) {
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

function stickyNav(entries, observer) {
  const entry = entries[0];
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");

  // console.log(navLinks.className);
}

function revealSection(entries, observer) {
  const entry = entries[0];
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
}

function loadImg(entries, observer) {
  const entry = entries[0];
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}

function displaySlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    console.log(s);
  });
}

function nextSlide() {
  if (currentSlide === maxSlides - 1) currentSlide = 0;
  else currentSlide++;
  displaySlide(currentSlide);
  activateDot(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0) currentSlide = maxSlides;
  else currentSlide--;
  displaySlide(currentSlide);
  activateDot(currentSlide);
}

function init() {
  createDots();
  activateDot(0);
  displaySlide(0);
}

init();

// open modal
btnsOpenModal.forEach(function (btn, i, arr) {
  btn.addEventListener("click", openModal);
});
// close modal
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// scroll to section
navLinks.addEventListener("click", navScroll);

// switch tab contents
document
  .querySelector(".operations-tab-container")
  .addEventListener("click", activateTab);

// nav.addEventListener("mouseover", function (event) {
//   hoverNav(event, 0.5);
// });
// nav.addEventListener("mouseout", function (event) {
//   hoverNav(event, 1);
// });

// same effect but use bind method
navLinks.addEventListener("mouseover", hoverNavBind.bind(0.5));
navLinks.addEventListener("mouseout", hoverNavBind.bind(1));

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", // start loading before actually reached img
});
imgTargets.forEach((img) => imgObserver.observe(img));

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") prevSlide();
  if (event.key === "ArrowRight") nextSlide();
});

dotsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("dots-dot")) {
    displaySlide(event.target.dataset.slide);
    activateDot(event.target.dataset.slide);
  }
});
