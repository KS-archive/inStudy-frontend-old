import React, { Component } from 'react';
import { withRouter } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import './nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '',
    };
  }

  handleRoute = (e, value) => {
    this.setState({ value });
    this.props.history.push(value);
  }

  renderLogo() {
    if (this.props.location.pathname !== '/') {
      return (
        <img
          className="nav__logo"
          src="./img/logo-instudy.png"
          alt="Logo inStudy"
          onClick={() => { this.props.history.push('/'); }}
        />
      );
    }
    return null;
  }

  renderUserLogo() {
    if (this.props.location.pathname !== '/' && this.props.location.pathname !== '/rejestracja' && this.props.location.pathname !== '/logowanie') {
      return (
        <div className="nav__loggedUser">
          <img className="nav__userLogo" src="http://via.placeholder.com/100x100" alt="to replace" />
        </div>
      );
    }
    return null;
  }

  render() {
    let headerClassAddon;

    if (this.props.location.pathname === '/' || ((this.props.location.pathname === '/rejestracja' || this.props.location.pathname === '/logowanie') && window.innerWidth > 800 && window.innerHeight > 900)) {
      headerClassAddon = 'transparent';
    } else {
      headerClassAddon = 'clasic';
    }

    return (
      <div>
        <header className={`nav__header ${headerClassAddon}`}>
          {this.renderLogo()}
          {this.renderUserLogo()}
          <IconMenu
            className="nav__menu"
            iconButtonElement={<IconButton><i className="far fa-bars nav__menuIcon" /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onChange={this.handleRoute}
            value={this.state.value}
          >
            <MenuItem primaryText="Strona główna" value="/" />
            <MenuItem primaryText="O projekcie" value="/o_projekcie" />
            <MenuItem primaryText="Logowanie" value="/logowanie" />
            <MenuItem primaryText="Rejestracja" value="/rejestracja" />
            <MenuItem primaryText="Kontakt" value="/kontakt" />
            <MenuItem primaryText="Wyloguj" value="/wyloguj" />
          </IconMenu>
        </header>
      </div>
    );
  }
}

export default withRouter(Nav);
