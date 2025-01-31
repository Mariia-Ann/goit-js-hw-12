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

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements.query.value.trim();

  if (!query) {
    showErrorMessage('Please enter a valid search query.');
    return;
  }
  
  cardContainer.innerHTML = '';

  showLoadingIndicator(loading);

  fetchImages(query)
    .then(data => renderImagesCard(data, cardContainer))
    .catch(onFetchError)
    .finally(() => {
      form.reset();
      hideLoadingIndicator(loading);
    });
}

function onFetchError(error) {
  console.log(error);
  showErrorMessage(
    'Sorry, there was an error with the request. Please try again later.'
  );
}