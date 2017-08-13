// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

// Views
import Index from './views/Index/Index';
import Hero from './views/Hero/Hero';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import PasswordRecovery from './views/PasswordRecovery/PasswordRecovery';
import Circles from './views/Circles/Circles';
import PublicProfile from './views/PublicProfile/PublicProfile';
import EditProfile from './views/EditProfile/EditProfile';
import PasswordRecoveryNew from './views/PasswordRecoveryNew/PasswordRecoveryNew';
import ConfirmEmail from './views/ConfirmEmail/ConfirmEmail';

// Main styles import.
import './scss/global.scss';

// Middleware
/* eslint-disable no-underscore-dangle */
const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

// Needed for onTouchTap (Material UI)
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3F51B5',
    primary2Color: '#303F9F',
    primary3Color: '#C5CAE9',
    accent1Color: '#4CAF50',
    accent2Color: '#BDBDBD',
    accent3Color: '#757575',
    textColor: '#212121',
    pickerHeaderColor: '#3F51B5',
  },
  button: {
    height: 50,
    minwidth: 190,
  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <Index>
          <Switch>
            <Route path="/inicjatywy/edit" component={EditProfile} />
            <Route path="/inicjatywy/:url" component={PublicProfile} />
            <Route path="/inicjatywy" component={Circles} />
            <Route path="/odzyskiwanie_hasla/:token" component={PasswordRecoveryNew} />
            <Route path="/odzyskiwanie_hasla" component={PasswordRecovery} />
            <Route path="/potwierdz_email/:token" component={ConfirmEmail} />
            <Route path="/rejestracja" component={SignUp} />
            <Route path="/logowanie" component={SignIn} />
            <Route path="/" component={Hero} />
          </Switch>
        </Index>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>, document.querySelector('.container'));
