import { FETCH_ACTIVE_CIRCLE, CHANGE_LOGO, CHANGE_CARD_DATA, ADD_MODULE, UPDATE_MODULE, DELETE_MODULE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIVE_CIRCLE:
      return action.payload;

    case CHANGE_LOGO:
      return { ...state, logo: action.payload };

    case CHANGE_CARD_DATA:
      return { ...state, ...action.payload };

    case ADD_MODULE:
    case UPDATE_MODULE:
    case DELETE_MODULE:
      return { ...state, modules: action.payload };

    default:
      return state;
  }
}
