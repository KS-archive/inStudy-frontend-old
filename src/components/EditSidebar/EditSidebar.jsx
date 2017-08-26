import React, { Component } from 'react';
import './editSidebar.scss';

export default class EditSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'Moduły', // Moduły, Dodaj moduł, Edycja modułu, Dodawanie modułu
    };
  }

  render() {
    return (
      <div className={`editSidebar__container ${!this.props.sidebar && 'hidden'}`}>
        <div className="editSidebar__containerArrow" onClick={this.props.toggleSidebar}>
          <i className={`fa fa-chevron-${this.props.sidebar ? 'left' : 'right'}`} aria-hidden="true" />
        </div>
        <div className="editSidebar__wrapper">
          <div className="editSidebar__title">{this.state.mode}</div>
          <div className="editSidebar__modules">
            {this.props.modules.map((module, index) => (
              <div className="editSidebar__moduleIcon" key={index}>{console.log(module)}</div>
            ))}
          </div>
          <i className="fa fa-plus editSidebar__specialBtn" aria-hidden="true" />
          <i className="fa fa-cog editSidebar__settings" aria-hidden="true" />
        </div>
      </div>
    );
  }
}
