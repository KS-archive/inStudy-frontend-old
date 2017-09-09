import React, { Component } from 'react';
import socialsList from '../../js/constants/socials';
import './membersTile.scss';

export default class MembersTile extends Component {
  shouldComponentUpdate(nextProps) {
    const propsToCheck = ['firstname', 'surname', 'coverImage', 'role', 'description', 'socials'];
    propsToCheck.map((prop) => {
      if (this.props[prop] !== nextProps[prop]) return true;
    });
    return false;
  }

  renderSocials = () => this.props.socials.map((social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <a className={`membersTile__social social__${icon} textHover`} href={social.link} key={index} target="_blank">
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </a>
    );
  });

  render() {
    return (
      <div className="membersTile__container" style={{ backgroundImage: `url(${this.props.coverImage})`, ...this.props.grayScale }} onClick={this.props.openDialog}>
        <div className="membersTile__dataContainer">
          <h3 className="membersTile__name">{`${this.props.firstname} ${this.props.surname}`}</h3>
          <p className="membersTile__role">{this.props.role}</p>
        </div>
        {(this.props.socials && this.props.socials.length !== 0) &&
          <div className="membersTile__socials">
            {this.renderSocials()}
          </div>
        }
      </div>
    );
  }
}
