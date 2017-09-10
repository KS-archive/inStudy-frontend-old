import React, { Component } from 'react';
import './projectsTile.scss';

export default class ProjectsTile extends Component {
  shouldComponentUpdate(nextProps) {
    const propsToCheck = ['images', 'coverImage', 'description', 'header', 'labelColors', 'labels', 'name', 'socials'];
    propsToCheck.map((prop) => {
      if (this.props[prop] !== nextProps[prop]) return true;
    });
    return false;
  }

  generateLabels = (labels) => {
    const { mainColors, labelColors } = this.props;
    return labels.map((label) => {
      let text = '';
      let color = '';
      switch (label) {
        case 'aktualne': text = 'Aktualny'; color = mainColors[labelColors[1]]; break;
        case 'archiwalne': text = 'Archiwalny'; color = mainColors[labelColors[2]]; break;
        case 'otwarte': text = 'Otwarty'; color = mainColors[labelColors[3]]; break;
        case 'cykliczne': text = 'Cykliczny'; color = mainColors[labelColors[4]]; break;
        default: return null;
      }
      return <div key={text} className="projectsTile__label" style={{ backgroundColor: color }}>{text}</div>;
    });
  }

  render() {
    return (
      <div className="projectsTile__container" style={{ backgroundImage: `url(${this.props.coverImage})` }} onClick={this.props.openDialog}>
        <div className="projectsTile__name">{this.props.title}</div>
        <div className="projectsTile__labels">
          {this.generateLabels(this.props.labels)}
        </div>
      </div>
    );
  }
}
