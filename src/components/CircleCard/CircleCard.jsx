import React, { PureComponent } from 'react';
import find from 'lodash/find';
import { cities, types, categories } from '../../js/constants/filterData';
import { Container, LogoContainer, Logo, Name, Category, BottomLine, UniversityLogo, InfoIcons, InfoIcon, TypeIcon, ReactTooltip } from './circleCard_styles';
import { CircleFlags } from '../../js/constants/circleDetails';

export default class CircleCard extends PureComponent {
  componentWillMount() {
    const { city, university, type, category, subcategory } = this.props;
    this.universityName = find(cities[city.toString()].universities, u => u.id === university.toString()).name;
    this.typeName = types[type.toString()].name;
    this.categoryName = categories[category.toString()].name;
    this.subcategoryName = find(categories[category.toString()].subcategories, s => s.id === subcategory.toString()).name;
  }

  renderTypeIcon = (type) => {
    const initiativeType = find(types, o => o.name === type);
    const icon = (initiativeType) ? initiativeType.icon : '?';
    return <TypeIcon data-tip={type}>{icon}</TypeIcon>;
  }

  renderFlags = (flags) => {
    if (flags && flags.length) {
      return flags.map((flag) => {
        const IconComponent = CircleFlags[flag];
        return (
          <InfoIcon data-tip={flag}>
            <IconComponent color="#fff" style={{ maxHeight: 20 }} />
          </InfoIcon>
        );
      });
    }
    return null;
  }

  render() {
    const { handleClick, logo, name, flags } = this.props;
    const logoSrc = logo || '/img/placeholders/logo.png';
    return (
      <Container onClick={handleClick}>
        <LogoContainer>
          <Logo src={logoSrc} alt={`${name} - logo`} />
        </LogoContainer>
        <Name>{name}</Name>
        <Category>{`${this.categoryName}, ${this.subcategoryName}`}</Category>
        <BottomLine>
          <UniversityLogo data-tip={this.universityName} src={`/img/universities/${this.universityName}.png`} alt={`${this.universityName} - logo`} />
          <InfoIcons>
            {this.renderFlags(flags)}
            {this.renderTypeIcon(this.typeName)}
          </InfoIcons>
          <ReactTooltip effect="solid" />
        </BottomLine>
      </Container>
    );
  }
}
