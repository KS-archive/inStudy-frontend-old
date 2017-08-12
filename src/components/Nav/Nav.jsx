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
    };
  }

  renderLogo() {
    if (this.props.location.pathname !== '/') {
      return <img className="nav__logo" src="./img/logo-instudy.png" alt="Logo inStudy" />;
    }
    return null;
  }

  renderUserLogo() {
    if (this.props.location.pathname !== '/') {
      return (
        <div className="nav__loggedUser">
          <img className="nav__userLogo" src="http://via.placeholder.com/100x100" alt="to replace" />
        </div>
      );
    }
    return null;
  }

  renderFiller() {
    if (this.props.location.pathname !== '/') {
      return <div className="nav__filler" style={{ height: this.props.height }} />;
    }
    return null;
  }

  render() {
    const headerStyle = (this.props.location.pathname === '/')
      ? { height: this.props.height, backgroundColor: 'transparent', boxShadow: 'none', marginTop: 30 }
      : { height: this.props.height };

    return (
      <div>
        <header className="nav__header" style={headerStyle}>
          {this.renderLogo()}
          {this.renderUserLogo()}
          <IconMenu
            className="nav__menu"
            iconButtonElement={<IconButton><i className="far fa-bars nav__menuIcon" /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText="O projekcie" />
            <MenuItem primaryText="Logowanie" />
            <MenuItem primaryText="Rejestracja" />
            <MenuItem primaryText="Kontakt" />
            <MenuItem primaryText="Wyloguj" />
          </IconMenu>
        </header>
        {this.renderFiller()}
      </div>
    );
  }
}

export default withRouter(Nav);
