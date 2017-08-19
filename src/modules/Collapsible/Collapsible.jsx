import React, { Component } from 'react';
import CollapsibleElement from '../CollapsibleElement/CollapsibleElement';
import './collapsible.scss';

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openId: null,
    };
  }

  renderElement = (elements, color) =>
    elements.map((element, index) => (
      <CollapsibleElement
        {...element}
        color={color}
        open={(this.state.openId === index)}
        handleClick={() => { (this.state.openId === index) ? this.setState({ openId: null }) : this.setState({ openId: index }); }}
        key={element.title}
      />));

  render() {
    return (
      <div className="collapsible__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        {this.renderElement(this.props.content, this.props.mainColors[this.props.color])}
      </div>
    );
  }
}
