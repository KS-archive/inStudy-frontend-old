import combineReducers from 'redux/lib/combineReducers';
import formReducer from 'redux-form/lib/reducer';
import filtersReducer from './filters_reducer';
import circlesReducer from './circles_reducer';
import activeCircleReducer from './activeCircle_reducer';
import publicCircleReducer from './publicCircle_reducer';
import notificationsReducer from './notifications_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  filters: filtersReducer,
  circles: circlesReducer,
  activeCircle: activeCircleReducer,
  publicCircle: publicCircleReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
