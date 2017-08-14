import React, { Component } from 'react';
import './projectsTile.scss';

export default class ProjectsTile extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="projectsTile__container" style={{ backgroundImage: `url(${this.props.coverImage})` }}>

      </div>
    );
  }
}
