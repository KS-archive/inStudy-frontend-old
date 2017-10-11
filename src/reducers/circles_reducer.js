import { GET_CIRCLES, EXTEND_CIRCLES } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case GET_CIRCLES:
      return action.payload;

    case EXTEND_CIRCLES:
      return [...state, ...action.payload];

    default:
      return state;
  }
}
