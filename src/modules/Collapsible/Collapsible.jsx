import React, { Component } from 'react';
import './collapsible.scss';

export default class Collapsible extends Component {
  renderElement = (elements, backgroundColor) =>
    elements.map(element => (
      <div className="collapsible__element" key={element.title}>
        <h2 className="collapsible__title" style={{ backgroundColor }}>{element.title}</h2>
        <p className="collapsible__description">{element.description}</p>
      </div>
    ));

  render() {
    return (
      <div className="collapsible__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        {this.renderElement(this.props.content, this.props.mainColors[this.props.color])}
      </div>
    );
  }
}
