import {
  renderImagesCard,
  showLoadingIndicator,
  hideLoadingIndicator,
  showErrorMessage,
} from './js/render-functions.js';

import { fetchImages } from './js/pixabay-api.js';

const cardContainer = document.querySelector('.card-container');
const searchForm = document.querySelector('.search-form');
const loading = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load');

let page = 1;
let limit = 40;
let query = '';
let totalHits = 0;

searchForm.addEventListener('submit', handleSearch);
btnLoad.addEventListener('click', loadMoreImages);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  query = form.elements.query.value.trim();

  if (!query) {
    showErrorMessage('Please enter a valid search query.');
    return;
  }

  page = 1;
  cardContainer.innerHTML = '';

  showLoadingIndicator(loading);
  btnLoad.classList.add('is-hidden');

  try {
    const data = await fetchImages(query, page, limit);
    renderImagesCard(data, cardContainer);
    totalHits = data.totalHits;

   if (totalHits > limit) {
      btnLoad.classList.remove('is-hidden');
    } else {
      btnLoad.classList.add('is-hidden');
    }

    page += 1;
  } catch (err) {
    onFetchError();
  } finally {
    form.reset();
    hideLoadingIndicator(loading);
  }
}

async function loadMoreImages() {
  if (page > Math.ceil(totalHits / limit)) {
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
    btnLoad.classList.add('is-hidden');
    return;
  }

  showLoadingIndicator(loading);

  try {
    const data = await fetchImages(query, page, limit);
    renderImagesCard(data, cardContainer);

    const liEl = cardContainer.querySelector('li');
    if (liEl) {
      const { height } = liEl.getBoundingClientRect();
      smoothScrollImages(height * 8, 0);
    }

    page += 1;

    if (page > Math.ceil(totalHits / limit)) {
      btnLoad.classList.add('is-hidden');
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: 'blue',
      });
    }
  } catch (err) {
    onFetchError();
  } finally {
    hideLoadingIndicator(loading);
  }
}

function onFetchError() {
  showErrorMessage(
    'Sorry, there was an error with the request. Please try again later.'
  );
}

function smoothScrollImages(top, left = 0) {
  window.scrollBy({ top, left, behavior: 'smooth' });
}
