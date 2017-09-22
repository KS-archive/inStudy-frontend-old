import React, { PureComponent } from 'react';
import projectLabels from '../../../js/constants/projectLabels';
import { Container, ImageWrapper, Label, Name } from './ProjectsTile2_styles';

export default class ProjectsTile2 extends PureComponent {
  renderLabel = (labelName) => {
    const { mainColors, labelColors } = this.props;
    const label = projectLabels[labelName];
    const [text, color] = [label.text, mainColors[labelColors[label.colorIndex]]];
    return <Label key={text} backgroundColor={color}>{text}</Label>;
  }

  render() {
    const { coverImage, openDialog, title, labels, grayScale } = this.props;

    return (
      <Container>
        <ImageWrapper onClick={openDialog} background={coverImage} grayScale={grayScale}>
          {labels.map(label => this.renderLabel(label))}
        </ImageWrapper>
        <Name onClick={openDialog}>{title}</Name>
      </Container>
    );
  }
}
