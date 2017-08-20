import React, { Component } from 'react';
import map from 'lodash/map';
import './profileHeader.scss';

export default class ProfileHeader extends Component {
  renderSocials = (socials) => {
    return map(socials, social => (
      <a className="profileHeader__social" href={social.link} target="_blank" key={social.name}>
        <i className={`fa fa-${social.name} social__${social.name} textHover`} aria-hidden="true" />
      </a>
    ));
  }

  render() {
    const { backgroundImg, logo, name, type, category, subcategory, university, city, email, phone, dateCreated, motto, socials, colors } = this.props;

    const date = `${dateCreated.getDate()}.${dateCreated.getMonth() + 1}.${dateCreated.getFullYear()}`

    const backgroundStyle = (backgroundImg)
      ? { backgroundImage: backgroundImg }
      : {
        backgroundImage: 'url(/img/hero_bg.svg)',
        backgroundColor: colors[0],
        backgroundBlendMode: 'multiply',
      };

    return (
      <div className="profileHeader__container">
        <div className="profileHeader__background" style={backgroundStyle} />
        <div className="profileHeader__card">
          <div className="profileHeader__mainData">
            <div className="profileHeader__logoContainer">
              <img src={logo} alt="Logo inicjatywy" className="profileHeader__logo"/>
            </div>
            <div className="profileHeader__dataContainer">
              <h1 className="profileHeader__name">{name}</h1>
              <div className="profileHeader__labels">
                <div className="profileHeader__label" style={{ backgroundColor: colors[0] }}>{type}</div>
                <div className="profileHeader__label" style={{ backgroundColor: colors[2] }}>{category}</div>
                <div className="profileHeader__label" style={{ backgroundColor: colors[2] }}>{subcategory}</div>
              </div>
              <div className="profileHeader__textContainer">
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">Uczelnia</p>
                  <p className="profileHeader__textContent">{university}</p>
                </div>
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">Miasto</p>
                  <p className="profileHeader__textContent">{city}</p>
                </div>
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">E-mail</p>
                  <p className="profileHeader__textContent">{email}</p>
                </div>
                {(phone) &&
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">Telefon</p>
                  <p className="profileHeader__textContent">{phone}</p>
                </div>}
                {(dateCreated) &&
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">Data założenia</p>
                  <p className="profileHeader__textContent">{date}</p>
                </div>}
                {(motto) &&
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">Motto</p>
                  <p className="profileHeader__textContent">{motto}</p>
                </div>}
              </div>
            </div>
          </div>
          <div className="profileHeader__socials" style={{ backgroundColor: colors[0] }}>
            <div className="profileHeader__socialsContainer">
              {this.renderSocials(socials)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
