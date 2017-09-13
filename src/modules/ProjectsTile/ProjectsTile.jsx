import React, { Component } from 'react';
import { Container, Name, Labels, Label } from './ProjectsTile_styles';

export default class ProjectsTile extends Component {
  componentWillMount() {
    const { mainColors, labelColors } = this.props;
    this.labels = {
      aktualne: {
        text: 'Aktualny',
        color: mainColors[labelColors[1]],
      },
      archiwalne: {
        text: 'Archiwalny',
        color: mainColors[labelColors[2]],
      },
      otwarte: {
        text: 'Otwarty',
        color: mainColors[labelColors[3]],
      },
      cykliczne: {
        text: 'Cykliczny',
        color: mainColors[labelColors[4]],
      },
    };
  }

  shouldComponentUpdate(nextProps) {
    const propsToCheck = ['images', 'coverImage', 'description', 'header', 'labelColors', 'labels', 'name', 'socials'];
    propsToCheck.map((prop) => {
      if (this.props[prop] !== nextProps[prop]) return true;
    });
    return false;
  }

  renderLabel = (labelName) => {
    const label = this.labels[labelName];
    return <Label key={label.text} backgroundColor={label.color}>{label.text}</Label>;
  }

  render() {
    const { coverImage, openDialog, title, labels } = this.props;
    return (
      <Container backgroundImage={coverImage} onClick={openDialog}>
        <Name>{title}</Name>
        <Labels>
          {labels.map(label => this.renderLabel(label))}
        </Labels>
      </Container>
    );
  }
}
