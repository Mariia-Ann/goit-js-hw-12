export function fetchImages(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '48242250-abd806f4b021d280ea207da17';

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}
