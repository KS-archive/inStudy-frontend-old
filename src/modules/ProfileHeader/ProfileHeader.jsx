import React, { PureComponent } from 'react';
import map from 'lodash/map';
import find from 'lodash/find';
import { cities, types, categories } from '../../utils/constants/filterData';
import socialsList from '../../utils/constants/socials';
import { Background, BackgroundEditIcon, Card, CardEditIcon, MainData, LogoContainer, Logo, LogoEditOverlay, DataContainer, CircleName, Labels, Label, TextContainer, TextRow, Name, Value, SocialsBar, SocialsContainer, SocialsEditOverlay, Social } from './ProfileHeader_styles';

export default class ProfileHeader extends PureComponent {
  componentWillMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  initialize = (props) => {
    const { city, university, type, category, subcategory } = props;
    this.setState({
      cityName: this.decodeId(cities, city),
      universityName: this.findAndDecodeId(cities, city, 'universities', university),
      typeName: this.decodeId(types, type),
      categoryName: this.decodeId(categories, category),
      subcategoryName: this.findAndDecodeId(categories, category, 'subcategories', subcategory),
    });
  }

  decodeId = (arr, id) => arr[id.toString()].name;

  findAndDecodeId = (arr, id, name, id2) =>
    find(arr[id.toString()][name],
      u => u.id === id2.toString(),
    ).name;

  renderSocials = socialsObj => map(socialsObj, (social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <Social href={social.link} target="_blank" key={index}>
        <i className={`fa fa-${icon} social__${icon} textHover`} aria-hidden="true" />
      </Social>
    );
  });

  render() {
    const { backgroundImg, logo, name, type, category, subcategory, university, city, email, phone, dateCreated, motto, department, protectors, colors, editable, socials } = this.props;
    const { cityName, universityName, typeName, categoryName, subcategoryName } = this.state;
    const cardEditData = { name, type, category, subcategory, university, city, email, phone, dateCreated, motto, department, protectors };

    return (
      <div>
        <Background editable={editable} color={colors[0]} backgroundImage={backgroundImg} />
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
              <Logo src={logo || '/img/placeholders/logo.png'} alt="Logo inicjatywy" />
              {editable &&
                <LogoEditOverlay onClick={() => { this.props.openDialog('logo', logo); }}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                </LogoEditOverlay>
              }
            </LogoContainer>
            <DataContainer>
              <CircleName>{name}</CircleName>
              <Labels>
                <Label style={{ backgroundColor: colors[0] }}>{typeName}</Label>
                <Label style={{ backgroundColor: colors[2] }}>{categoryName}</Label>
                <Label style={{ backgroundColor: colors[2] }}>{subcategoryName}</Label>
              </Labels>
              <TextContainer>
                <TextRow>
                  <Name>Miasto</Name>
                  <Value>{cityName}</Value>
                </TextRow>
                <TextRow>
                  <Name>Uczelnia</Name>
                  <Value>{universityName}</Value>
                </TextRow>
                {(department) &&
                <TextRow>
                  <Name>Wydział</Name>
                  <Value>{department}</Value>
                </TextRow>}
                {(protectors) &&
                <TextRow>
                  <Name>Opiekun</Name>
                  <Value>{protectors}</Value>
                </TextRow>}
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
