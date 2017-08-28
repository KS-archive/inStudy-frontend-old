import axios from 'axios';
import { getCookie } from '../js/cookies';
import { GET_CIRCLES, FETCH_ACTIVE_CIRCLE } from './types';

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

export function getActiveCircle() {
  const url = `${__ROOT_URL__}api//user/getInfo`;
  const header = {
    Authorization: `cos ${getCookie('token')}`,
  };
  console.log(header);
  const request = axios.post(url, null, {
    headers: header,
  });

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_ACTIVE_CIRCLE,
        payload: data.user,
      });
    });
  };
}

export function setActiveCircle(circle) {
  return {
    type: FETCH_ACTIVE_CIRCLE,
    payload: circle,
  };
}
