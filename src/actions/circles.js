import axios from 'axios';
import map from 'lodash/map';
import { getTokenHeader } from '../js/utils';
import { GET_CIRCLES, FETCH_PUBLIC_CIRCLE, FETCH_ACTIVE_CIRCLE, CHANGE_LOGO, CHANGE_CARD_DATA } from './types';

export function getCircles(page, limit, query, city, university, type, category, subcategory) {
  const optionalParams = { query, city, university, type, category, subcategory };
  let urlDetails = '';
  map(optionalParams, (value, key) => {
    if (value) urlDetails += `&${key}=${key}`;
  });
  const url = `${__ROOT_URL__}api/circles?page=${page}&limit=${limit}${urlDetails}`;
  const request = axios.get(url);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: GET_CIRCLES,
        payload: data.data,
      });
    });
  };
}

export function getActiveCircle() {
  const url = `${__ROOT_URL__}api//user/getInfo`;
  const headers = getTokenHeader();
  const request = axios.post(url, null, { headers });

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_ACTIVE_CIRCLE,
        payload: data[0],
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
  const url = `${__ROOT_URL__}api/user/getInfo`;
  const headers = getTokenHeader();
  const request = axios.post(url, file, { headers });

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: CHANGE_LOGO,
        payload: data.user,
      });
    });
  };
}

export function changeCardData(newData, callback) {
  const url = `${__ROOT_URL__}api/edit/basics`;
  const headers = getTokenHeader();
  const request = axios.put(url, newData, { headers });

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: CHANGE_CARD_DATA,
        payload: newData,
      });
      callback();
    });
  };
}
