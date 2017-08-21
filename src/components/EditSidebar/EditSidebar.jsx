import React, { Component } from 'react';
import './editSidebar.scss';

export default class EditSidebar extends Component {
  render() {
    return (
      <div className={`editSidebar__container ${!this.props.sidebar && 'hidden'}`}>
        <div className="editSidebar__containerArrow" onClick={this.props.toggleSidebar}>
          <i className={`fa fa-chevron-${this.props.sidebar ? 'left' : 'right'}`} aria-hidden="true" />
        </div>
      </div>
    );
  }
}
