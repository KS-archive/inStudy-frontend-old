import axios from 'axios';
import { FETCH_CITIES, FETCH_UNIVERSITIES, FETCH_TYPES, FETCH_CATEGORIES, FETCH_SUBCATEGORIES } from './types';

export const fetchCities = () => {
  const url = 'http://localhost:8080/api/helper/all?what=city';
  const request = axios.get(url);
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_CITIES,
        payload: data,
      });
    });
  };
};

export const fetchUniversities = (id) => {
  const url = `http://localhost:8080/api/helper?city=${id}`;
  const request = axios.get(url);
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_UNIVERSITIES,
        payload: data,
      });
    });
  };
};

export const fetchTypes = () => {
  const data = [
    {
      id: 1,
      name: 'Koło Naukowe',
    },
    {
      id: 2,
      name: 'Organizacja',
    },
    {
      id: 3,
      name: 'Fundacja',
    },
    {
      id: 4,
      name: 'Stowarzyszenie',
    },
    {
      id: 5,
      name: 'Inne',
    },
  ];

  return {
    type: FETCH_TYPES,
    payload: data,
  };
};

export const fetchCategories = () => {
  const url = 'http://localhost:8080/api/helper/all?what=category';
  const request = axios.get(url);
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: data,
      });
    });
  };
};

export const fetchSubactegories = (id) => {
  console.log(id);
  const url = `http://localhost:8080/api/helper?category=${id}`;
  const request = axios.get(url);
  return (dispatch) => {
    request.then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_SUBCATEGORIES,
        payload: data,
      });
    });
  };
};
