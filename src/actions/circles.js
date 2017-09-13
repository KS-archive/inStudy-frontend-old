import axios from 'axios';
import map from 'lodash/map';
import { getTokenHeader } from '../js/utils';
import { GET_CIRCLES, FETCH_PUBLIC_CIRCLE, FETCH_ACTIVE_CIRCLE } from './types';
import circle from '../reducers/activeCircle_reducer(mock)';
// import circles from '../reducers/circles_reducer(mock)';

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
        payload: data,
      });
    });
  };
  // return {
  //   type: GET_CIRCLES,
  //   payload: circles,
  // };
}

export function getActiveCircle() {
  const url = `${__ROOT_URL__}api//user/getInfo`;
  const headers = getTokenHeader();
  const request = axios.post(url, null, { headers });

  return (dispatch) => {
    request.then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_ACTIVE_CIRCLE,
        payload: data.user,
      });
    });
  };
  // return {
  //   type: FETCH_ACTIVE_CIRCLE,
  //   payload: circle,
  // };
}

export function getPublicCircle(circleURL) {
  // const url = `${__ROOT_URL__}api/circle?circle=${circleURL}`;
  // const request = axios.get(url);
  //
  // return (dispatch) => {
  //   request.then(({ data }) => {
  //     dispatch({
  //       type: FETCH_PUBLIC_CIRCLE,
  //       payload: data.data,
  //     });
  //   });
  // };
  return {
    type: FETCH_PUBLIC_CIRCLE,
    payload: circle,
  };
}
