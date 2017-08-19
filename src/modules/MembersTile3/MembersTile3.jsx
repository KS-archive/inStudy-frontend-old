import React, { Component } from 'react';
import './membersTile3.scss';

export default class MembersTile3 extends Component {
  shouldComponentUpdate(nextProps) {
    const propsToCheck = ['firstname', 'surname', 'coverImage', 'role', 'description', 'socials'];
    propsToCheck.map((prop) => {
      if (this.props[prop] !== nextProps[prop]) return true;
    });
    return false;
  }

  renderSocials = () => this.props.socials.map(social => (
    <a className={`membersTile3__social social__${social.name} textHover`} href={social.link} key={social.name} target="_blank">
      <i className={`fa fa-${social.name}`} aria-hidden="true" />
    </a>
  ));

  render() {
    return (
      <div className="membersTile3__container" style={this.props.grayScale} onClick={this.props.openDialog}>
        <div className="membersTile3__image" style={{ backgroundImage: `url(${this.props.coverImage})` }} />
        <div className="membersTile3__data">
          <h3 className="membersTile3__name">{`${this.props.firstname} ${this.props.surname}`}</h3>
          {(this.props.role) &&
            <p className="membersTile3__role" style={{ color: this.props.mainColors[this.props.roleColor] }}>{this.props.role}</p>
          }
        </div>
        {(this.props.socials && this.props.socials.length !== 0) &&
          <div className="membersTile3__socials">
            {this.renderSocials()}
          </div>
        }
      </div>
    );
  }
}
