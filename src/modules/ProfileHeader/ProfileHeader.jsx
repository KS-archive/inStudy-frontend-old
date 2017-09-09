import React, { Component } from 'react';
import map from 'lodash/map';
import find from 'lodash/find';
import { cities, types, categories } from '../../js/constants/filterData';
import socialsList from '../../js/constants/socials';
import { Background, BackgroundEditIcon, Card, CardEditIcon, MainData, LogoContainer, Logo, LogoEditOverlay, DataContainer, CircleName, Labels, Label, TextContainer, TextRow, Name, Value, SocialsBar, SocialsContainer, SocialsEditOverlay, Social } from './ProfileHeader_styles';

export default class ProfileHeader extends Component {
  componentWillMount() {
    const { city, university, type, category, subcategory } = this.props;
    this.cityName = cities[city].name;
    this.universityName = find(cities[city].universities, u => u.id === university).name;
    this.typeName = types[type].name;
    this.categoryName = categories[category].name;
    this.subcategoryName = find(categories[category].subcategories, s => s.id === subcategory).name;
  }

  renderSocials = socialsObj => map(socialsObj, (social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <Social href={social.link} target="_blank" key={index}>
        <i className={`fa fa-${icon} social__${icon} textHover`} aria-hidden="true" />
      </Social>
    );
  });

  render() {
    const { backgroundImg, logo, name, type, category, subcategory, university, city, email, phone, dateCreated, motto, colors, editable, socials } = this.props;
    const backgroundStyle = (backgroundImg)
      ? { backgroundImage: backgroundImg }
      : {
        backgroundImage: 'url(/img/hero_bg.svg)',
        backgroundColor: colors[0],
        backgroundBlendMode: 'multiply',
      };
    const cardEditData = { name, type, category, subcategory, university, city, email, phone, dateCreated, motto };

    return (
      <div>
        <Background editable={editable} style={{ ...backgroundStyle }} />
        {editable &&
          <BackgroundEditIcon
            className="fa fa-pencil-square-o"
            aria-hidden="true"
            onClick={() => { this.props.openDialog('background', backgroundImg); }}
          />
        }
        <Card>
          {editable &&
            <CardEditIcon
              className="fa fa-pencil-square-o"
              aria-hidden="true"
              onClick={() => { this.props.openDialog('card', cardEditData); }}
            />
          }
          <MainData>
            <LogoContainer>
              <Logo src={logo} alt="Logo inicjatywy" />
              {editable &&
                <LogoEditOverlay onClick={() => { this.props.openDialog('logo', logo); }}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                </LogoEditOverlay>
              }
            </LogoContainer>
            <DataContainer>
              <CircleName>{name}</CircleName>
              <Labels>
                <Label style={{ backgroundColor: colors[0] }}>{this.typeName}</Label>
                <Label style={{ backgroundColor: colors[2] }}>{this.categoryName}</Label>
                <Label style={{ backgroundColor: colors[2] }}>{this.subcategoryName}</Label>
              </Labels>
              <TextContainer>
                <TextRow>
                  <Name>Uczelnia</Name>
                  <Value>{this.universityName}</Value>
                </TextRow>
                <TextRow>
                  <Name>Miasto</Name>
                  <Value>{this.cityName}</Value>
                </TextRow>
                <TextRow>
                  <Name>E-mail</Name>
                  <Value>{email}</Value>
                </TextRow>
                {(phone) &&
                <TextRow>
                  <Name>Telefon</Name>
                  <Value>{phone}</Value>
                </TextRow>}
                {(dateCreated) &&
                <TextRow>
                  <Name>Data założenia</Name>
                  <Value>{dateCreated}</Value>
                </TextRow>}
                {(motto) &&
                <TextRow>
                  <Name className="profileHeader__textTitle">Motto</Name>
                  <Value>{motto}</Value>
                </TextRow>}
              </TextContainer>
            </DataContainer>
          </MainData>
          <SocialsBar backgroundColor={colors[0]}>
            <SocialsContainer>
              {this.renderSocials(socials)}
              {editable &&
                <SocialsEditOverlay>
                  <i
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                    onClick={() => { this.props.openDialog('socials', socials); }}
                  />
                </SocialsEditOverlay>
              }
            </SocialsContainer>
          </SocialsBar>
        </Card>
      </div>
    );
  }
}
