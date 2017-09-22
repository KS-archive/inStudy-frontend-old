import React, { PureComponent } from 'react';
import { SectionHeader } from '../../utils/globalStyles';
import { Wrapper, Container, Element, NumberField, Line, Description } from './Numbers_styles';

export default class Numbers extends PureComponent {
  renderNumber = (element, index, color) => (
    <Element key={index}>
      <NumberField color={color}>{element.number}</NumberField>
      <Line backgroundColor={color} />
      <Description>{element.description}</Description>
    </Element>
  );

  render() {
    const { title, content, mainColors, color } = this.props;

    return (
      <Wrapper>
        <SectionHeader>{title}</SectionHeader>
        <Container>
          {content.map((el, index) => this.renderNumber(el, index, mainColors[color]))}
        </Container>
      </Wrapper>
    );
  }
}
