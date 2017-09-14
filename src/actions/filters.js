import { UPDATE_FILTER, DELETE_FILTER, UPDATE_QUERY } from './types';

export const updateFilter = (id, value) => {
  return {
    type: UPDATE_FILTER,
    payload: { id, value },
  };
};

export const deleteFilter = (id) => {
  return {
    type: DELETE_FILTER,
    payload: id,
  };
};

export const updateQuery = (query = '') => {
  return {
    type: UPDATE_QUERY,
    payload: query,
  };
};
