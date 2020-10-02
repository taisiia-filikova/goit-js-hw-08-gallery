// Импорт исходного массива

import galleryItems from './gallery-items.js';

// Ссылки
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  content: document.querySelector('.lightbox__content'),
  lightboxImages: document.querySelector('.lightbox__image'),

  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
  rightBtn: document.querySelector('button[data-action="right-btn"]'),
  leftBtn: document.querySelector('button[data-action="left-btn"]'),
};

gallery;

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

function createMurkup(picture) {
  return picture
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"> <a class="gallery__link" href=${original}> <img class="gallery__image" src=${preview} data-source=${original} alt=${description} </a> </li>`;
    })
    .join('');
}
