import React, { Component } from 'react';
import './numbers.scss';

export default class IconText extends Component {
  renderNumbers = (elements, color) =>
    elements.map(element => (
      <div className="numbers__element" key={`${element.number}${element.description}`}>
        <h1 className="numbers__number" style={{ color }}>{element.number}</h1>
        <div className="numbers__line" style={{ backgroundColor: color }} />
        <p className="numbers__description">{element.description}</p>
      </div>
    ));

  render() {
    return (
      <div className="numbers__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="numbers__container">
          {this.renderNumbers(this.props.content, this.props.mainColors[this.props.color])}
        </div>
      </div>
    );
  }
}
