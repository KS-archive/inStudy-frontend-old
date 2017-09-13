import React, { PureComponent } from 'react';
import socialsList from '../../js/constants/socials';
import { Container, DataContainer, Name, Role, Socials, Social } from './MembersTile_styles';

export default class MembersTile extends PureComponent {
  renderSocials = () => this.props.socials.map((social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <Social className={`social__${icon} textHover`} href={social.link} key={index} target="_blank">
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </Social>
    );
  });

  render() {
    const { coverImage, grayScale, openDialog, firstname, surname, role, socials } = this.props;
    return (
      <Container backgroundImage={coverImage} grayScale={grayScale} onClick={openDialog}>
        <DataContainer>
          <Name>{`${firstname} ${surname}`}</Name>
          <Role>{role}</Role>
        </DataContainer>
        {(socials && socials.length !== 0) &&
          <Socials>{this.renderSocials()}</Socials>
        }
      </Container>
    );
  }
}
