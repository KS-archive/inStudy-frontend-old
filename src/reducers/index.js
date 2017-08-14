import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import filtersReducer from './filters_reducer';
import circlesReducer from './circles_reducer';
import helpersReducer from './helpers_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  filters: filtersReducer,
  circles: circlesReducer,
  helpers: helpersReducer,
});

export default rootReducer;
