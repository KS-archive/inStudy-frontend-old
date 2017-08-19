import React, { Component } from 'react';
import './membersTile2.scss';

export default class MembersTile2 extends Component {
  shouldComponentUpdate(nextProps) {
    const propsToCheck = ['firstname', 'surname', 'coverImage', 'role', 'description', 'socials'];
    propsToCheck.map((prop) => {
      if (this.props[prop] !== nextProps[prop]) return true;
    });
    return false;
  }

  renderSocials = () => this.props.socials.map(social => (
    <a className={`membersTile2__social social__${social.name} textHover`} href={social.link} key={social.name} target="_blank">
      <i className={`fa fa-${social.name}`} aria-hidden="true" />
    </a>
  ));

  render() {
    return (
      <div className="membersTile2__container" style={this.props.grayScale}>
        <div className="membersTile2__image" style={{ backgroundImage: `url(${this.props.coverImage})` }} onClick={this.props.openDialog} />
        <h3 className="membersTile2__name" onClick={this.props.openDialog}>{`${this.props.firstname} ${this.props.surname}`}</h3>
        {(this.props.role) &&
          <p className="membersTile2__role" onClick={this.props.openDialog} style={{ color: this.props.mainColors[this.props.roleColor] }}>{this.props.role}</p>
        }
        {(this.props.socials && this.props.socials.length !== 0) &&
          <div className="membersTile2__socials">
            {this.renderSocials()}
          </div>
        }
      </div>
    );
  }
}
