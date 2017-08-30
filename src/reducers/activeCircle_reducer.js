import { FETCH_ACTIVE_CIRCLE, CHANGE_LOGO, CHANGE_CARD_DATA } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIVE_CIRCLE:
      return action.payload;

    case CHANGE_LOGO:
      return { ...state, logo: action.payload };

    case CHANGE_CARD_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
