import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41431482-f58044795534ed1451dcf24b8';

export async function fetchRequest(value, page = 1, perPage = 40) {
  try {
    const params = new URLSearchParams({
      q: value,
      key: API_KEY,
      page: page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    const resp = await axios.get(`${BASE_URL}?${params}`);
    if (!resp.data.hits || !resp.data.totalHits) {
      Notify.info('You entered an incorrect request');
      throw new Error('Nothing found for your request!');
    }
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}
