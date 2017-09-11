import React, { Component } from 'react';
import socialsList from '../../js/constants/socials';
import { Container, Image, Data, Name, Role, Socials, Social } from './MembersTile3_styles';

export default class MembersTile3 extends Component {
  renderSocials = () => this.props.socials.map((social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <Social className={`social__${icon} textHover`} href={social.link} key={index} target="_blank">
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </Social>
    );
  });

  render() {
    const { coverImage, grayScale, openDialog, firstname, surname, role, socials, mainColors, roleColor } = this.props;

    return (
      <Container grayScale={grayScale} onClick={openDialog}>
        <Image backgroundImage={coverImage} />
        <Data>
          <Name>{`${firstname} ${surname}`}</Name>
          {(role) && <Role color={mainColors[roleColor]}>{role}</Role>}
        </Data>
        {(socials && socials.length !== 0) &&
          <Socials onClick={(e) => { e.stopPropagation(); }}>{this.renderSocials()}</Socials>
        }
      </Container>
    );
  }
}
