import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import Recruitment from 'material-ui/svg-icons/social/notifications-active';
import OpenProjects from 'material-ui/svg-icons/social/people';
import './circleCard.scss';

export default class CircleCard extends Component {
  renderTypeIcon = (type) => {
    let icon;
    switch (type) {
      case 'Koło Naukowe': icon = 'K'; break;
      case 'Organizacja': icon = 'O'; break;
      case 'Fundacja': icon = 'F'; break;
      case 'Stowarzyszenie': icon = 'S'; break;
      case 'Inny': icon = 'I'; break;
      default: icon = '?';
    }

    return <div className="circleCard__typeIcon" data-tip={type}>{icon}</div>;
  }

  render() {
    console.log(this.props);
    const { type, onClick, logo, name, category, subcategory, university, flags } = this.props;
    return (
      <div className="circleCard__container" onClick={onClick}>
        <div className="circleCard__logoContainer">
          <img src={(logo) || './img/placeholders/logo.png'} alt={`${name} - logo`} className="circleCard__logo" />
        </div>
        <h3 className="circleCard__name">{name}</h3>
        <p className="circleCard__category">{`${category}, ${subcategory}`}</p>
        <div className="circleCard__bottomLine">
          <img className="circleCard__university" data-tip={university} src={`./img/universities/${university}.png`} alt={`${university} - logo`} />
          <div className="circleCard__infoIcons">
            {(flags && flags.includes('recruitment'))
              && <div className="circleCard__infoIcon" data-tip="Rekrutuje"><Recruitment color="#fff" style={{ maxHeight: 20 }} /></div>}
            {(flags && flags.includes('open_projects'))
              && <div className="circleCard__infoIcon" data-tip="Otwarte projekty"><OpenProjects color="#fff" style={{ maxHeight: 20 }} /></div>}
            {this.renderTypeIcon(type)}
          </div>
          <ReactTooltip effect="solid" className="circleCard__tooltip" />
        </div>
      </div>
    );
  }
}
