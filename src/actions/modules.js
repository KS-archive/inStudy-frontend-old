import axios from 'axios';
import { getTokenHeader } from '../js/utils';
import { ADD_MODULE, UPDATE_MODULE, DELETE_MODULE } from './types';

export function addModule(module, successCallback, errorCallback) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  const request = axios.post(url, module, { headers });

  return (dispatch) => {
    request.then(({ data: { data } }) => {
      successCallback();
      dispatch({
        type: ADD_MODULE,
        payload: data,
      });
    }, () => { errorCallback(); });
  };
}

export function updateModule(module, successCallback, errorCallback) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  const request = axios.put(url, module, { headers });

  return (dispatch) => {
    request.then((data) => {
      successCallback();
      dispatch({
        type: UPDATE_MODULE,
        payload: data.data.data,
      });
    }, () => { errorCallback(); });
  };
}

export function deleteModule(id, successCallback, errorCallback) {
  const url = `${__ROOT_URL__}api/modules/${id}`;
  const headers = getTokenHeader();
  const request = axios.delete(url, { headers });

  return (dispatch) => {
    request.then((data) => {
      successCallback();
      dispatch({
        type: DELETE_MODULE,
        payload: data.data.data,
      });
    }, () => { errorCallback(); });
  };
}
