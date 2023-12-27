
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41431482-f58044795534ed1451dcf24b8';

export async function fetchRequest(value, page = 1, perPage = 40) {
    const response =  await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${value}&page=${page}&per_page=${perPage}`
    )
    if(!response) {
      throw new Error(response)
    }
    return response
  }
