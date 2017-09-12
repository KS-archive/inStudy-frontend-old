import axios from 'axios';
import { getTokenHeader } from '../js/utils';
import { CHANGE_LOGO, CHANGE_BACKGROUND, CHANGE_CARD_DATA, CHANGE_SOCIALS, CHANGE_COLORS, CHANGE_TAGS } from './types';

export function changeLogo(file) {
  const url = `${__ROOT_URL__}api/file/send_logo`;
  const headers = getTokenHeader();
  console.log(file);
  const request = axios.post(url, file, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data);
      // dispatch({
      //   type: CHANGE_LOGO,
      //   payload: data,
      // });
    });
  };
}

export function changeBackground(module) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  console.log(module);
  const request = axios.post(url, module, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data);
      // dispatch({
      //   type: CHANGE_BACKGROUND,
      //   payload: data,
      // });
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

export function changeColors(module) {
  const url = `${__ROOT_URL__}api/modules`;
  const headers = getTokenHeader();
  console.log(module);
  const request = axios.post(url, module, { headers });

  return (dispatch) => {
    request.then((data) => {
      console.log(data);
      // dispatch({
      //   type: CHANGE_COLORS,
      //   payload: data,
      // });
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
