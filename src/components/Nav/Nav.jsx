import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { withRouter } from 'react-router';
import MediaQuery from 'react-responsive';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { removeActiveCircle } from '../../actions/circles';
import { getCookie, deleteCookie } from '../../js/cookies';
import { Header, AppLogo, LoggedUser, UserLogo, IconMenu } from './Nav_styles';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      pathname: '',
      logged: getCookie('token'),
    };
  }

  componentWillMount() {
    const { pathname } = this.props.location;
    this.setState({ pathname });
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    if (pathname !== this.state.pathname) this.setState({ pathname, logged: getCookie('token') });
  }

  handleRoute = (e, value) => {
    console.log(value);
    if (value === 'wyloguj') {
      this.logout();
    } else {
      this.props.history.push(value);
    }
  }

  logout = () => {
    deleteCookie('token');
    this.props.removeActiveCircle();
    this.setState({ logged: false });
    this.props.history.push('/');
  }

  renderLogo() {
    if (this.state.pathname !== '/') {
      return (
        <AppLogo
          src="/img/logo-instudy.png"
          alt="Logo inStudy"
          onClick={() => { this.props.history.push('/'); }}
        />
      );
    }
    return null;
  }

  // renderUserLogo() {
  //   const path = this.state.pathname;
  //   (path !== '/'
  //   && path !== '/rejestracja'
  //   && path !== '/logowanie'
  //   && !path.includes('/odzyskiwanie_hasla')
  //   && !path.includes('/potwierdz_email'))
  //   && (
  //     <LoggedUser>
  //       <UserLogo src="http://via.placeholder.com/100x100" alt="to replace" />
  //     </LoggedUser>
  //     );
  // }

  render() {
    const { logged, pathname } = this.state;
    const transparentMode = (
      pathname === '/'
      || ((pathname === '/rejestracja'
      || pathname === '/logowanie'
      || pathname.includes('/odzyskiwanie_hasla')
      || pathname.includes('/potwierdz_email'))));
    const menuAttrs = {
      iconButtonElement: (
        <IconButton iconStyle={{ minWidth: 30, minHeight: 30, marginTop: -2 }}>
          <MenuIcon color="#fff" />
        </IconButton>
      ),
      anchorOrigin: { horizontal: 'right', vertical: 'top' },
      targetOrigin: { horizontal: 'right', vertical: 'top' },
      onChange: this.handleRoute,
      value: this.state.pathname,
    }

    return (
      <div>
        <Header transparent={transparentMode}>
          {this.renderLogo()}
          {/* {this.renderUserLogo()} */}
          <MediaQuery minDeviceWidth={701}>
            <IconMenu {...menuAttrs}>
              <MenuItem primaryText="Strona główna" value="/" />
              <MenuItem primaryText="Lista kół" value="/inicjatywy" />
              {!logged && <MenuItem primaryText="Zaloguj się" value="/logowanie" />}
              {!logged && <MenuItem primaryText="Zarejestruj się" value="/rejestracja" />}
              {logged && <MenuItem primaryText="Edytuj profil" value="/inicjatywy/edit" />}
              {logged && <MenuItem primaryText="Wyloguj się" value="wyloguj" />}
            </IconMenu>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={700}>
            <IconMenu {...menuAttrs}>
              <MenuItem primaryText="Strona główna" value="/" />
              <MenuItem primaryText="Lista kół" value="/inicjatywy" />
            </IconMenu>
          </MediaQuery>
        </Header>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeActiveCircle }, dispatch);
}

export default withRouter(
  connect(null, mapDispatchToProps)(Nav),
);
