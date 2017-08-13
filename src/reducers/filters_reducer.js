import { omit } from 'lodash';
import { UPDATE_FILTER, DELETE_FILTER } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return { ...state, [action.payload.id]: action.payload.value };

    case DELETE_FILTER:
      return omit(state, action.payload);

    default:
      return state;
  }
}
