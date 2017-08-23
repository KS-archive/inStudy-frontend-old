import { FETCH_CITIES, FETCH_UNIVERSITIES, FETCH_TYPES, FETCH_CATEGORIES, FETCH_SUBCATEGORIES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_CITIES:
      return { ...state, cities: action.payload.data };

    case FETCH_UNIVERSITIES:
    console.log(action.payload.city[0]);
      return { ...state, universities: action.payload.city[0].universites };

    case FETCH_TYPES:
      return { ...state, types: action.payload };

    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload.data };

    case FETCH_SUBCATEGORIES:
      return { ...state, subcategories: action.payload.category[0].subcategory };

    default:
      return state;
  }
}
