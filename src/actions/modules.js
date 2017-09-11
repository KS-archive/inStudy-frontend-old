import axios from 'axios';
import { getTokenHeader } from '../js/utils';
import { ADD_MODULE, UPDATE_MODULE, DELETE_MODULE } from './types';

export function addModule(module) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  const request = axios.post(url, module, { headers });

  return (dispatch) => {
    request.then(({ data: { data } }) => {
      dispatch({
        type: ADD_MODULE,
        payload: data,
      });
    });
  };
}

export function updateModule(module) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  const request = axios.put(url, module, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data.data.data);
      dispatch({
        type: UPDATE_MODULE,
        payload: data.data.data,
      });
    });
  };
}

export function deleteModule(id) {
  console.log(id);
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  const request = axios.delete(url, id, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log('data');
      // dispatch({
      //   type: DELETE_MODULE,
      //   payload: data,
      // });
    });
  };
}
