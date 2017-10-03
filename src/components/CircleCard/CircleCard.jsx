import React, { PureComponent } from 'react';
import find from 'lodash/find';
import { cities, categories } from '../../utils/constants/filterData';
import { Container, LogoContainer, Logo, ContentContainer, Name, Category, BottomLine, UniversityLogo, Flag, ReactTooltip } from './circleCard_styles';

export default class CircleCard extends PureComponent {
  componentWillMount() {
    const { city, university, category, subcategory } = this.props;
    this.universityName = find(cities[city.toString()].universities, u => u.id === university.toString()).name;
    this.categoryName = categories[category.toString()].name;
    this.subcategoryName = find(categories[category.toString()].subcategories, s => s.id === subcategory.toString()).name;
  }

  render() {
    const { handleClick, logo, name, recruitment } = this.props;
    const logoSrc = logo || '/img/placeholders/logo.png';
    return (
      <Container onClick={handleClick}>
        <LogoContainer>
          <Logo src={logoSrc} alt={`${name} - logo`} />
        </LogoContainer>
        <ContentContainer>
          <Name>{name}</Name>
          <Category>{`${this.categoryName}, ${this.subcategoryName}`}</Category>
          <BottomLine>
            <UniversityLogo data-tip={this.universityName} background={`/img/universities/${this.universityName}.png`} />
            {(recruitment) &&
              <Flag>Rekrutuje</Flag>
            }
            <ReactTooltip effect="solid" />
          </BottomLine>
        </ContentContainer>
      </Container>
    );
  }
}
