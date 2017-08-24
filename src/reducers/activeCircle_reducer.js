import { FETCH_ACTIVE_CIRCLE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIVE_CIRCLE:
      return action.payload;

    default:
      return state;
  }
}
