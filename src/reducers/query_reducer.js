import { UPDATE_QUERY } from '../actions/types';

export default function (state = '', action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return action.payload;

    default:
      return state;
  }
}
