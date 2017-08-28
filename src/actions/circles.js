import axios from 'axios';
import { getCookie } from '../js/cookies';
import { GET_CIRCLES, FETCH_PUBLIC_CIRCLE, FETCH_ACTIVE_CIRCLE, CHANGE_LOGO } from './types';

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
  const headers = {
    Authorization: `cos ${getCookie('token')}`,
  };
  const request = axios.post(url, null, { headers });

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_ACTIVE_CIRCLE,
        payload: data.user,
      });
    });
  };
}

export function getPublicCircle(circleURL) {
  const url = `${__ROOT_URL__}api/circle?circle=${circleURL}`;
  const request = axios.get(url);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_PUBLIC_CIRCLE,
        payload: data.data,
      });
    });
  };
}

export function changeLogo(file) {
  const url = `${__ROOT_URL__}api//user/getInfo`;
  const headers = {
    Authorization: `cos ${getCookie('token')}`,
  };
  const request = axios.post(url, file, { headers });

  return (dispatch) => {
    request.then(({ data }) => {
      console.log(data);
      dispatch({
        type: CHANGE_LOGO,
        payload: data.user,
      });
    });
  };
}
