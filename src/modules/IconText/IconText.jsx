import React, { Component } from 'react';
import './iconText.scss';

export default class IconText extends Component {
  renderIcons = (elements, iconColor) =>
    elements.map(element => (
      <div className="iconText__element" key={element.title}>
        <i className={`iconText__icon fa fa-${element.icon}`} style={{ color: iconColor }} />
        <h3 className="iconText__title">{element.title}</h3>
        <p className="iconText__description">{element.description}</p>
      </div>
    ));

  render() {
    return (
      <div className="iconText__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="iconText__container">
          {this.renderIcons(this.props.content, this.props.mainColors[this.props.color])}
        </div>
      </div>
    );
  }
}
