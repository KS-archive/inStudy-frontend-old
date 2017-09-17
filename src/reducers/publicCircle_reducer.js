import { FETCH_PUBLIC_CIRCLE, REMOVE_PUBLIC_CIRCLE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PUBLIC_CIRCLE:
    case REMOVE_PUBLIC_CIRCLE:
      return action.payload;

    default:
      return state;
  }
}
