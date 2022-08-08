import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '29047113-bf47c2744467f006c769e271e';

export const getImages = async (search, page) => {
  const response = await axios.get(
    `/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const images = response.data.hits.map(
    ({ id, webformatURL, largeImageURL }) => {
      return {
        id,
        webformatURL,
        largeImageURL,
      };
    }
  );
  return images;
};
