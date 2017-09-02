import React, { Component } from 'react';
import find from 'lodash/find';
import { Container, LogoContainer, Logo, Name, Category, BottomLine, UniversityLogo, InfoIcons, InfoIcon, TypeIcon, ReactTooltip } from './circleCard_styles';
import { CircleFlags } from '../../js/constants/circleDetails';
import { initiativeTypes } from '../../js/constants/filterData';

export default class CircleCard extends Component {
  renderTypeIcon = (type) => {
    const initiativeType = find(initiativeTypes, o => o.type === type);
    const icon = (initiativeType) ? initiativeType.icon : '?';
    return <TypeIcon data-tip={type}>{icon}</TypeIcon>;
  }

  renderFlags = (flags) => {
    if (flags && flags.length) {
      return flags.map((flag) => {
        const IconComponent = CircleFlags[flag];
        return (
          <InfoIcon data-tip="Rekrutuje">
            <IconComponent color="#fff" style={{ maxHeight: 20 }} />
          </InfoIcon>
        );
      });
    }
    return null;
  }

  render() {
    const { type, onClick, logo, name, category, subcategory, university, flags } = this.props;
    const logoSrc = logo || './img/placeholders/logo.png';
    return (
      <Container onClick={onClick}>
        <LogoContainer>
          <Logo src={logoSrc} alt={`${name} - logo`} />
        </LogoContainer>
        <Name>{name}</Name>
        <Category>{`${category}, ${subcategory}`}</Category>
        <BottomLine>
          <UniversityLogo data-tip={university} src={`./img/universities/${university}.png`} alt={`${university} - logo`} />
          <InfoIcons>
            {this.renderFlags(flags)}
            {this.renderTypeIcon(type)}
          </InfoIcons>
          <ReactTooltip effect="solid" />
        </BottomLine>
      </Container>
    );
  }
}
