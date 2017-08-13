import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import filtersReducer from './filters_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  filters: filtersReducer,
});

export default rootReducer;
