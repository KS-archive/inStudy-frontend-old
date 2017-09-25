import { getCookie } from '../utils/cookies';

export const detectIE = () => {
  const ua = window.navigator.userAgent;
  return (ua.includes('MSIE') || ua.includes('Trident/') || ua.includes('Edge/'));
};

export const getTokenHeader = () => {
  return {
    Authorization: `cos ${getCookie('token')}`,
  };
};

export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const hasAnyValue = (obj) => {
  for (let key in obj) {
    if (obj[key] !== null)
      return true;
    }
  return false;
};
