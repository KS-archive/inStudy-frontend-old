import { UPDATE_FILTER, DELETE_FILTER } from './types';

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
