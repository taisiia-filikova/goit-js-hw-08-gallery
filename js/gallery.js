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
  rightBtn: document.querySelector('button[data-action="right-btn"]'),
  leftBtn: document.querySelector('button[data-action="left-btn"]'),
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

  refs.overlay.addEventListener('click', closeModalOverlay);
  refs.closeBtn.addEventListener('click', closeModal);
  refs.rightBtn.addEventListener('click', openModalAnotherImg);
  refs.leftBtn.addEventListener('click', openModalAnotherImg);
  window.addEventListener('keydown', closeModalEsc);
  window.addEventListener('keydown', openModalAnotherImg);
}

// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.

function closeModal(e) {
  refs.lightbox.classList.remove('is-open');

  refs.overlay.removeEventListener('click', closeModalOverlay);
  refs.closeBtn.removeEventListener('click', closeModal);
  refs.rightBtn.removeEventListener('click', openModalAnotherImg);
  refs.leftBtn.removeEventListener('click', openModalAnotherImg);
  window.removeEventListener('keydown', closeModalEsc);
  window.removeEventListener('keydown', openModalAnotherImg);

  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

// Закрытие модального окна по клику на div.lightbox__overlay.
function closeModalOverlay(e) {
  if (e.currentTarget === e.target) {
    closeModal(e);
  }
}

// Закрытие модального окна по нажатию клавиши ESC.
function closeModalEsc(e) {
  if (e.code === 'Escape') {
    closeModal(e);
  }
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

function openModalAnotherImg(e) {
  let i = galleryItems.findIndex(
    item => item.original === refs.lightboxImage.src,
  );

  if (
    e.code === 'ArrowLeft' ||
    e.code === 'ArrowDown' ||
    refs.leftBtn === e.target
  ) {
    if (i === 0) {
      i += galleryItems.length;
    }
    i -= 1;
  }

  if (
    e.code === 'ArrowRight' ||
    e.code === 'ArrowUp' ||
    refs.rightBtn === e.target
  ) {
    if (i === galleryItems.length - 1) {
      i -= galleryItems.length;
    }
    i += 1;
  }

  refs.lightboxImage.src = galleryItems[i].original;
  refs.lightboxImage.alt = galleryItems[i].description;
}

// Тоже самое, но проще и без стрелочек вверх-вниз
// function openModalAnotherImg(e) {
//   let i = galleryItems.findIndex(
//     item => item.original === refs.lightboxImage.src,
//   );

//   if (e.code === 'ArrowLeft') {
//     if (i === 0) {
//       return;
//     }
//     i -= 1;
//   }

//   if (e.code === 'ArrowRight') {
//     if (i === galleryItems.length - 1) {
//       return;
//     }
//     i += 1;
//   }

//   refs.lightboxImage.src = galleryItems[i].original;
//   refs.lightboxImage.alt = galleryItems[i].description;
// }
