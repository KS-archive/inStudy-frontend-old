import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Recruitment from 'material-ui/svg-icons/social/notifications-active';
import OpenProjects from 'material-ui/svg-icons/social/people';
import './circleCard.scss';

class CircleCard extends Component {
  renderTypeIcon = () => {
    const type = this.props.type;
    let icon;

    switch (type) {
      case 1: icon = 'K'; break;
      case 2: icon = 'O'; break;
      case 3: icon = 'F'; break;
      case 4: icon = 'S'; break;
      case 5: icon = 'I'; break;
      default: icon = '?';
    }

    return <div className="circleCard__typeIcon" data-tip={this.props.helpers.types[type]}>{icon}</div>;
  }

  render() {
    const category = this.props.helpers.categories[this.props.category];
    const subcategory = this.props.helpers.subcategories[this.props.subcategory];
    const university = this.props.helpers.universities[this.props.university];
    console.log(this.props);
    return (
      <div className="circleCard__container" key={this.props.key} onClick={this.props.onClick}>
        <div className="circleCard__logoContainer">
          <img src={this.props.logo} alt={`${this.props.name} - logo`} className="circleCard__logo" />
        </div>
        <h3 className="circleCard__name">{this.props.name}</h3>
        <p className="circleCard__category">{`${category}, ${subcategory}`}</p>
        <div className="circleCard__bottomLine">
          <img className="circleCard__university" data-tip={university} src={`./img/universities/${university}.png`} alt={`${university} - logo`} />
          <div className="circleCard__infoIcons">
            {(this.props.flags.includes('recruitment'))
              && <div className="circleCard__infoIcon" data-tip="Rekrutuje"><Recruitment color="#fff" style={{ maxHeight: 20 }} /></div>}
            {(this.props.flags.includes('open_projects'))
              && <div className="circleCard__infoIcon" data-tip="Otwarte projekty"><OpenProjects color="#fff" style={{ maxHeight: 20 }} /></div>}
            {this.renderTypeIcon()}
          </div>
          <ReactTooltip effect="solid" className="circleCard__tooltip" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    helpers: state.helpers,
  };
}

export default connect(mapStateToProps)(CircleCard);
