import { cardLayout } from './js/cardLayout';
import { imagesApiService } from './js/imagesApiService';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let page = 1;

btnLoadMore.style.display = 'none';

function addImage({ data, config }) {
  const pageNow = config.params.page;
  const totalPages = Math.ceil(data.totalHits / config.params.per_page);
  if (!data.hits.length) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (data.hits.length && totalPages > pageNow) {
    btnLoadMore.style.display = 'block';
    const layout = cardLayout(data.hits);
    gallery.insertAdjacentHTML('beforeend', layout);

    const simpleLightbox = new SimpleLightbox('.photo-card a');

    simpleLightbox.refresh();
    enableSmoothScrolling();
  } else if (totalPages === pageNow) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    btnLoadMore.style.display = 'none';
  }
  if (pageNow > 1) {
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`, {
      position: 'center-top',
    });
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  btnLoadMore.style.display = 'none';
  gallery.innerHTML = '';
  page = 1;
  imagesApiService(input.value, page).then(addImage);
});

btnLoadMore.addEventListener('click', () => {
  page++;
  imagesApiService(input.value, page).then(addImage);
});

window.addEventListener('scroll', () => {
  const docRect = document.documentElement.getBoundingClientRect();
  if (docRect.bottom < document.documentElement.clientHeight + 150) {
    page++;
    imagesApiService(input.value, page).then(addImage);
  }
});

function enableSmoothScrolling() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
