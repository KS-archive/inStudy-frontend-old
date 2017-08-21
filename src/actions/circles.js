import axios from 'axios';
import { GET_CIRCLES } from './types';

export function getCircles(page, limit, query, city, university, type, category, subcategory) {
  const queryString = query ? `&query=${query}` : '';
  const cityString = city ? `&city=${city}` : '';
  const universityString = university ? `&university=${university}` : '';
  const typeString = type ? `&type=${type}` : '';
  const categoryString = category ? `&category=${category}` : '';
  const subcategoryString = subcategory ? `&subcategory=${subcategory}` : '';
  const url = `${__ROOT_URL__}api/circles?page=${page}&limit=${limit}${queryString}${cityString}${universityString}${typeString}${categoryString}${subcategoryString}`;
  const request = axios.get(url);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: GET_CIRCLES,
        payload: data,
      });
    });
  };
}
