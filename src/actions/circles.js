import axios from 'axios';
import { getTokenHeader } from '../js/utils';
import { GET_CIRCLES, FETCH_PUBLIC_CIRCLE, FETCH_ACTIVE_CIRCLE, REMOVE_ACTIVE_CIRCLE, REMOVE_PUBLIC_CIRCLE } from './types';
// import circle from '../reducers/activeCircle_reducer(mock)';
// import circles from '../reducers/circles_reducer(mock)';

export function getCircles(page, limit, query, filters) {
  const queryString = query && `&query=${query}`;
  let filtersDetails = '';
  Object.keys(filters).map((filter) => {
    if (filters[filter]) {
      filtersDetails += `&${filter}=${filters[filter]}`;
    }
  });
  const url = `${__ROOT_URL__}api/circles?page=${page}&limit=${limit}${queryString}${filtersDetails}`;
  console.log(url);
  const request = axios.get(url);

  return (dispatch) => {
    request.then(({ data }) => {
      console.log(data);
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

export function getActiveCircle(errorCallback) {
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
    }, () => { errorCallback(); });
  };
  // return {
  //   type: FETCH_ACTIVE_CIRCLE,
  //   payload: circle,
  // };
}

export function removeActiveCircle() {
  return {
    type: REMOVE_ACTIVE_CIRCLE,
    payload: {},
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
  // return {
  //   type: FETCH_PUBLIC_CIRCLE,
  //   payload: circle,
  // };
}

export function removePublicCircle() {
  return {
    type: REMOVE_PUBLIC_CIRCLE,
    payload: {},
  };
}
