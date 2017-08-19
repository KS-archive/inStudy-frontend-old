import React, { Component } from 'react';
import './collapsibleElement.scss';

export default class Collapsible extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="collapsible__element" key={this.props.title}>
        <h2 className="collapsible__title" style={{ backgroundColor: this.props.color }} onClick={this.props.handleClick}>{this.props.title}</h2>
        <div className={`collapsible__descriptionContainer ${this.props.open && 'active'}`} style={{ borderColor: this.props.color }}>
          <p className="collapsible__description">{this.props.description}</p>
        </div>
      </div>
    );
  }
}
