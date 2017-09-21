import React, { PureComponent } from 'react';
import projectLabels from '../../../js/constants/projectLabels';
import { Container, Name, Labels, Label } from './ProjectsTile_styles';

export default class ProjectsTile extends PureComponent {
  renderLabel = (labelName) => {
    const { mainColors, labelColors } = this.props;
    const label = projectLabels[labelName];
    const [text, color] = [label.text, mainColors[labelColors[label.colorIndex]]];
    return <Label key={text} backgroundColor={color}>{text}</Label>;
  }

  render() {
    const { coverImage, openDialog, title, labels, grayScale } = this.props;
    return (
      <Container backgroundImage={coverImage} onClick={openDialog} grayScale={grayScale}>
        <Name>{title}</Name>
        <Labels>
          {labels.map(label => this.renderLabel(label))}
        </Labels>
      </Container>
    );
  }
}
