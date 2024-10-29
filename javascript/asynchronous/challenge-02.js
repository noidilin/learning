'use strict';

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

let currentImg;

createImage('src/img-1.jpg')
  .then((img) => {
    currentImg = img;
    imgContainer.append(currentImg);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('src/img-2.jpg');
  })
  .then((img) => {
    currentImg = img;
    imgContainer.append(currentImg);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch((err) => console.log(err));
