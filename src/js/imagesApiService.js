import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32442279-c6d2c60bb11a1366e9ba654b8';
const defaultShowItem = 40;

export async function imagesApiService(value, page) {
  try {
    const searchOptions = {
      params: {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: value,
        page: page,
        per_page: defaultShowItem,
      },
    };
    const url = `${BASE_URL}?key=${API_KEY}`;
    const res = await axios.get(url, searchOptions);
    return res;
  } catch (error) {
    console.error(error.message);
  }
}
