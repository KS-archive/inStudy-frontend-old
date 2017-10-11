import axios from 'axios';
import { getTokenHeader } from '../utils/utils';
import { GET_CIRCLES, EXTEND_CIRCLES, FETCH_PUBLIC_CIRCLE, FETCH_ACTIVE_CIRCLE, REMOVE_ACTIVE_CIRCLE, REMOVE_PUBLIC_CIRCLE } from './types';

export function getCircles(page, limit, query, filters, comp, extend = true) {
  const queryString = query && `&query=${query}`;
  let filtersDetails = '';
  Object.keys(filters).map((filter) => {
    if (filters[filter]) {
      filtersDetails += `&${filter}=${filters[filter]}`;
    }
  });
  const url = `${__ROOT_URL__}api/circles?page=${page}&limit=${limit}${queryString}${filtersDetails}`;
  const request = axios.get(url);

  return (dispatch) => {
    request.then(({ data }) => {
      if (comp) {
        if (data.length !== comp.limit) {
          comp.isMore = false;
        }
        comp.showLoader = false;
        comp.checkIsBottom = true;
        comp.page += 1;
      }

      if (extend) {
        dispatch({
          type: EXTEND_CIRCLES,
          payload: data,
        });
      } else {
        dispatch({
          type: GET_CIRCLES,
          payload: data,
        });
      }
    });
  };
}

export function getActiveCircle(errorCallback) {
  const url = `${__ROOT_URL__}api//user/getInfo`;
  const headers = getTokenHeader();
  const request = axios.post(url, null, { headers });

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_ACTIVE_CIRCLE,
        payload: data.user,
      });
    }, () => { errorCallback(); });
  };
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
}

export function removePublicCircle() {
  return {
    type: REMOVE_PUBLIC_CIRCLE,
    payload: {},
  };
}
