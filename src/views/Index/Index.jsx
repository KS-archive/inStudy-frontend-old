import React, { Component } from 'react';
import './index.scss';

export default class Index extends Component {
  render() {
    return (
      <div className="index__container">
        {this.props.children}
      </div>
    );
  }
}
