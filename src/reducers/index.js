import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import filtersReducer from './filters_reducer';
import circlesReducer from './circles_reducer';
import selectHelpersReducer from './selectHelpers_reducer';
import activeCircleReducer from './activeCircle_reducer';
import socialsReducer from './socials_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  filters: filtersReducer,
  circles: circlesReducer,
  socials: socialsReducer,
  activeCircle: activeCircleReducer,
  selectHelpers: selectHelpersReducer,
});

export default rootReducer;
