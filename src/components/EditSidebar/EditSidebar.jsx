import React, { Component } from 'react';
import './editSidebar.scss';

export default class EditSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  render() {
    return (
      <div className={`editSidebar__container ${!this.state.open && 'hidden'}`}>
        <div className="editSidebar__containerArrow" onClick={() => { this.setState({ open: !this.state.open }); }}>
          <i className={`fa fa-chevron-${this.state.open ? 'left' : 'right'}`} aria-hidden="true" />
        </div>
      </div>
    );
  }
}
