import React, { Component } from 'react';
import CollapsibleElement from './CollapsibleElement/CollapsibleElement';
import { SectionHeader } from '../../utils/globalStyles';
import { Wrapper } from './Collapsible_styles';

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openId: null,
    };
  }

  toggleCollapsible = (index) => {
    const isOpen = (this.state.openId === index);
    this.setState({ openId: !isOpen && index });
  }

  renderElement = (elements, color) =>
    elements.map((element, index) => (
      <CollapsibleElement
        key={element.title}
        color={color}
        open={(this.state.openId === index)}
        handleClick={() => { this.toggleCollapsible(index); }}
        {...element}
      />));

  render() {
    const { title, content, mainColors, color } = this.props;
    return (
      <Wrapper>
        <SectionHeader>{title}</SectionHeader>
        {this.renderElement(content, mainColors[color])}
      </Wrapper>
    );
  }
}
