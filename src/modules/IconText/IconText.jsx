import React, { PureComponent } from 'react';
import { SectionHeader } from '../../js/globalStyles';
import { Wrapper, Container, Element, Icon, Title, Description } from './IconText_styles';

export default class IconText extends PureComponent {
  renderIcons = (elements, iconColor) =>
    elements.map(({ title, icon, description }) => (
      <Element key={title}>
        <Icon className={`fa fa-${icon}`} color={iconColor} />
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Element>
    ));

  render() {
    const { title, content, mainColors, color } = this.props;
    return (
      <Wrapper>
        <SectionHeader>{title}</SectionHeader>
        <Container>
          {this.renderIcons(content, mainColors[color])}
        </Container>
      </Wrapper>
    );
  }
}
