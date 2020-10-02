// Импорт исходного массива
import galleryItems from './gallery-items.js';

// Ссылки
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  content: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox__image'),

  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

refs.gallery.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
refs.gallery.addEventListener('click', openModal);

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

function createMarkup(picture) {
  return picture
    .map(({ preview, original, description }) => {
      return `<li class='gallery__item'> <a class='gallery__link' href='${original}'> <img class='gallery__image' src='${preview}' data-source='${original}' alt='${description}'/> </a> </li>`;
    })
    .join('');
}

// Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image

function openModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  refs.lightboxImage.src = e.target.dataset.source;
  refs.lightboxImage.alt = e.target.alt;

  refs.lightbox.classList.add('is-open');

  refs.closeBtn.addEventListener('click', closeModal);
}

// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.

function closeModal(e) {
  refs.lightbox.classList.remove('is-open');
  refs.closeBtn.removeEventListener('click', closeModal);
}
