import React, { Component } from 'react';
import map from 'lodash/map';
import find from 'lodash/find';
import { cities, types, categories } from '../../js/constants/filterData';
import socials from '../../js/constants/socials';
import './profileHeader.scss';

export default class ProfileHeader extends Component {
  cityName = cities[this.props.city].name;
  universityName = find(cities[this.props.city].universities, u => u.id === this.props.university).name;
  typeName = types[this.props.type].name;
  categoryName = categories[this.props.category].name;
  subcategoryName = find(categories[this.props.category].subcategories, s => s.id === this.props.subcategory).name;

  renderSocials = socialsObj => map(socialsObj, social => (
    <a className="profileHeader__social" href={social.link} target="_blank" key={social.id}>
      <i className={`fa fa-${socials[social.id].iconName} social__${socials[social.id].iconName} textHover`} aria-hidden="true" />
    </a>
  ));

  render() {
    const { backgroundImg, logo, name, type, category, subcategory, university, city, email, phone, dateCreated, motto, colors, editable } = this.props;

    const backgroundStyle = (backgroundImg)
      ? { backgroundImage: backgroundImg }
      : {
        backgroundImage: 'url(/img/hero_bg.svg)',
        backgroundColor: colors[0],
        backgroundBlendMode: 'multiply',
      };

    const editableBackground = editable ? { top: 0 } : {};

    return (
      <div className="profileHeader__container">
        <div className="profileHeader__background" style={{ ...backgroundStyle, ...editableBackground }} />
        {editable &&
          <i className="fa fa-pencil-square-o profileHeader__backgroundEdit" aria-hidden="true" onClick={() => { this.props.openDialog('background', backgroundImg); }} />
        }
        <div className="profileHeader__card">
          {editable &&
            <i className="fa fa-pencil-square-o profileHeader__cardEdit" aria-hidden="true" onClick={() => { this.props.openDialog('card', { name, type, category, subcategory, university, city, email, phone, dateCreated, motto }); }} />
          }
          <div className="profileHeader__mainData">
            <div className="profileHeader__logoContainer">
              <img src={logo} alt="Logo inicjatywy" className="profileHeader__logo" />
              {editable &&
                <div className="profileHeader__logoEdit" onClick={() => { this.props.openDialog('logo', logo); }}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                </div>
              }
            </div>
            <div className="profileHeader__dataContainer">
              <h1 className="profileHeader__name">{name}</h1>
              <div className="profileHeader__labels">
                <div className="profileHeader__label" style={{ backgroundColor: colors[0] }}>{this.typeName}</div>
                <div className="profileHeader__label" style={{ backgroundColor: colors[2] }}>{this.categoryName}</div>
                <div className="profileHeader__label" style={{ backgroundColor: colors[2] }}>{this.subcategoryName}</div>
              </div>
              <div className="profileHeader__textContainer">
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">Uczelnia</p>
                  <p className="profileHeader__textContent">{this.universityName}</p>
                </div>
                <div className="profileHeader__textRow">
                  <p className="profileHeader__textTitle">Miasto</p>
                  <p className="profileHeader__textContent">{this.cityName}</p>
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
                  <p className="profileHeader__textContent">{dateCreated}</p>
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
              {this.renderSocials(this.props.socials)}
              {editable &&
                <div className="profileHeader__socialEdit">
                  <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => { this.props.openDialog('socials', this.props.socials); }} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
