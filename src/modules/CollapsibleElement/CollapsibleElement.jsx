import React, { Component } from 'react';
import { Element, Title, DescriptionContainer, Description } from './CollapsibleElement_styles';

export default class Collapsible extends Component {
  render() {
    const { open, title, color, handleClick, description } = this.props;
    return (
      <Element active={open} key={title}>
        <Title backgroundColor={color} onClick={handleClick}>{title}</Title>
        <DescriptionContainer active={open} borderColor={color}>
          <Description>{description}</Description>
        </DescriptionContainer>
      </Element>
    );
  }
}
