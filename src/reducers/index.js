import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import filtersReducer from './filters_reducer';
import circlesReducer from './circles_reducer';
import constElementsReducer from './constElements_reducer';
import universitiesReducer from './universities_reducer';
import subcategoriesReducer from './subcategories_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  filters: filtersReducer,
  circles: circlesReducer,
  constElements: constElementsReducer,
  universities: universitiesReducer,
  subcategories: subcategoriesReducer,
});

export default rootReducer;
