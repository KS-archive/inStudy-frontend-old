import { FETCH_ACTIVE_CIRCLE, CHANGE_LOGO } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIVE_CIRCLE:
      return action.payload;

    case CHANGE_LOGO:
      return { ...state, logo: action.payload };

    default:
      return state;
  }
}
