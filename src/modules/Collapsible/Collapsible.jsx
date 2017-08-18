import React, { Component } from 'react';
import CollapsibleElement from '../CollapsibleElement/CollapsibleElement';
import './collapsible.scss';

export default class Collapsible extends Component {
  renderElement = (elements, color) =>
    elements.map(element => <CollapsibleElement {...element} color={color} key={element.title} />);

  render() {
    return (
      <div className="collapsible__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        {this.renderElement(this.props.content, this.props.mainColors[this.props.color])}
      </div>
    );
  }
}
