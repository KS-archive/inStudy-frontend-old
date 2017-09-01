import React, { Component } from 'react';
import { withRouter } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Header, AppLogo, LoggedUser, UserLogo, IconMenu } from './Nav_styles';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '',
      pathname: '',
    };
  }

  componentWillMount() {
    const { pathname } = this.props.location;
    this.setState({ pathname });
  }

  componentDidUpdate() {
    const { pathname } = this.props.location;
    if (pathname !== this.state.pathname) this.setState({ pathname });
  }

  handleRoute = (e, value) => {
    this.setState({ value });
    this.props.history.push(value);
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

  renderUserLogo() {
    const path = this.state.pathname;
    (path !== '/'
    && path !== '/rejestracja'
    && path !== '/logowanie'
    && !path.includes('/odzyskiwanie_hasla')
    && !path.includes('/potwierdz_email'))
    && (
      <LoggedUser>
        <UserLogo src="http://via.placeholder.com/100x100" alt="to replace" />
      </LoggedUser>
      );
  }

  render() {
    const path = this.state.pathname;
    const transparentMode = (
      path === '/'
      || ((path === '/rejestracja'
      || path === '/logowanie'
      || path.includes('/odzyskiwanie_hasla')
      || path.includes('/potwierdz_email'))
      && window.innerWidth > 800
      && window.innerHeight > 900));
    return (
      <div>
        <Header transparent={transparentMode}>
          {this.renderLogo()}
          {this.renderUserLogo()}
          <IconMenu
            iconButtonElement={<IconButton iconStyle={{ minWidth: 30, minHeight: 30, marginTop: -2 }}><MenuIcon color="#fff" /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onChange={this.handleRoute}
            value={this.state.value}
          >
            <MenuItem primaryText="Strona główna" value="/" />
            <MenuItem primaryText="Lista kół" value="/inicjatywy" />
            <MenuItem primaryText="Logowanie" value="/logowanie" />
            <MenuItem primaryText="Rejestracja" value="/rejestracja" />
            <MenuItem primaryText="Nowe hasło" value="/odzyskiwanie_hasla/123" />
            <MenuItem primaryText="Potwierdzenie maila" value="/potwierdz_email/123" />
          </IconMenu>
        </Header>
      </div>
    );
  }
}

export default withRouter(Nav);
