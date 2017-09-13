import { FETCH_ACTIVE_CIRCLE, ADD_MODULE, UPDATE_MODULE, DELETE_MODULE, CHANGE_LOGO, CHANGE_BACKGROUND, CHANGE_CARD_DATA, CHANGE_SOCIALS, CHANGE_COLORS, CHANGE_TAGS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ACTIVE_CIRCLE:
      return action.payload;

    case ADD_MODULE:
    case UPDATE_MODULE:
    case DELETE_MODULE:
      return { ...state, modules: action.payload };

    case CHANGE_LOGO:
      return { ...state, logo: action.payload };

    case CHANGE_BACKGROUND:
      return { ...state, backgroundImg: action.payload };

    case CHANGE_CARD_DATA:
      return { ...state, ...action.payload };

    case CHANGE_SOCIALS:
      return { ...state, socials: action.payload };

    case CHANGE_COLORS:
    console.log(action.payload);
      return { ...state, colors: action.payload };

    case CHANGE_TAGS:
      return { ...state, tags: action.payload };

    default:
      return state;
  }
}
