import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Nav from '../../components/Nav/Nav';
import './index.scss';

class Index extends Component {
  render() {
    const path = this.props.location.pathname;
    const bodyMargin = (path !== '/' && path !== '/rejestracja' && path !== '/logowanie' && !path.includes('/odzyskiwanie_hasla') && !path.includes('/potwierdz_email'))
      ? { marginTop: 60, minHeight: 'calc(100vh - 60px)' }
      : { minHeight: '100vh' };

    return (
      <div className="index__container">
        <Nav />
        <div className="index__body" style={bodyMargin}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
