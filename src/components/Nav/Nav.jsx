import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { withRouter } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { removeActiveCircle } from '../../actions/circles';
import { getCookie, deleteCookie } from '../../js/cookies';
import { Header, AppLogo, IconMenu } from './Nav_styles';

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
    const location = window.location;
    if (!location.protocol.includes('https') && location.hostname !== 'localhost') {
      const newOrigin = location.origin.replace('http', 'https');
      location.replace(`${newOrigin}${location.pathname}`);
    } else {
      const { pathname } = this.props.location;
      this.setState({ pathname });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    if (pathname !== this.state.pathname) this.setState({ pathname, logged: getCookie('token') });
  }

  handleRoute = (e, value) => {
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

  render() {
    const { logged, pathname } = this.state;
    const transparentMode = (pathname === '/');
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
    };
    const isMobile = (window.screen.width <= 700);

    return (
      <div>
        <Header transparent={transparentMode}>
          {this.renderLogo()}
          <IconMenu {...menuAttrs}>
            <MenuItem primaryText="Strona główna" value="/" />
            <MenuItem primaryText="Lista inicjatyw" value="/inicjatywy" />
            {!logged && !isMobile && <MenuItem primaryText="Zaloguj się" value="/logowanie" />}
            {!logged && !isMobile && <MenuItem primaryText="Zarejestruj się" value="/rejestracja" />}
            {logged && !isMobile && <MenuItem primaryText="Edytuj profil" value="/inicjatywy/edit" />}
            {logged && !isMobile && <MenuItem primaryText="Wyloguj się" value="wyloguj" />}
          </IconMenu>
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
