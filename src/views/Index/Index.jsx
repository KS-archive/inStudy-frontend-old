import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Nav from '../../components/Nav/Nav';
import './index.scss';
import '../../js/font_awesome/brands.min';
import '../../js/font_awesome/regular.min';
import '../../js/font_awesome/fontawesome';

class Index extends Component {
  render() {
    const navHeight = 60;
    const bodyHeight = (this.props.location.pathname !== '/')
      ? { height: `calc(100vh - ${navHeight}px)` }
      : { height: '100vh' };

    return (
      <div className="index__container">
        <Nav height={navHeight} />
        <div className="index__body" style={bodyHeight}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
