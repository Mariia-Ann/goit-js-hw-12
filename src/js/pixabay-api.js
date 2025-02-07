import axios from 'axios';

export async function fetchImages(query, page = 1, perPage = 15) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '48242250-abd806f4b021d280ea207da17';
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        per_page: perPage,
        page: page,
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
}
