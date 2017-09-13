import axios from 'axios';
import { getTokenHeader } from '../js/utils';
import { CHANGE_LOGO, CHANGE_BACKGROUND, CHANGE_CARD_DATA, CHANGE_SOCIALS, CHANGE_COLORS, CHANGE_TAGS } from './types';

export function changeLogo(file) {
  const url = `${__ROOT_URL__}api/file/send_logo`;
  let headers = getTokenHeader();
  headers = { ...headers, 'content-type': 'multipart/form-data' };
  const formData = new FormData();
  formData.append('image', file);
  const request = axios.post(url, formData, { headers });

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: CHANGE_LOGO,
        payload: data.data.data,
      });
    });
  };
}

export function changeBackground(file) {
  const url = `${__ROOT_URL__}api/file/send_background`;
  let headers = getTokenHeader();
  headers = { ...headers, 'content-type': 'multipart/form-data' };
  const formData = new FormData();
  formData.append('image', file);
  const request = axios.post(url, formData, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data);
      dispatch({
        type: CHANGE_BACKGROUND,
        payload: data.data.data,
      });
    });
  };
}

export function changeCardData(newData, callback) {
  const url = `${__ROOT_URL__}api/edit/basics`;
  const headers = getTokenHeader();
  const request = axios.put(url, newData, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data);
      dispatch({
        type: CHANGE_CARD_DATA,
        payload: newData,
      });
      callback();
    });
  };
}

export function changeSocials(module) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  console.log(module);
  const request = axios.post(url, module, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data);
      // dispatch({
      //   type: CHANGE_SOCIALS,
      //   payload: data,
      // });
    });
  };
}

export function changeColors(colors) {
  const url = `${__ROOT_URL__}api/user/colors`;
  const headers = getTokenHeader();
  const request = axios.put(url, { colors }, { headers });

  return (dispatch) => {
    request.then(() => {
      dispatch({
        type: CHANGE_COLORS,
        payload: colors,
      });
    });
  };
}

export function changeTags(module) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  console.log(module);
  const request = axios.post(url, module, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data);
      // dispatch({
      //   type: CHANGE_TAGS,
      //   payload: data,
      // });
    });
  };
}
