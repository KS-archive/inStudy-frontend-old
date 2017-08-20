import { GET_CIRCLES } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case GET_CIRCLES:
      return [...state, action.payload];

    default:
      return state;
  }
}
