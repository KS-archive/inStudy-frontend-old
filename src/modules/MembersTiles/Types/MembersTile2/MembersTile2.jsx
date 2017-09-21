import React, { PureComponent } from 'react';
import socialsList from '../../../../js/constants/socials';
import { Container, Image, Name, Role, Socials, Social } from './MembersTile2_styles';

export default class MembersTile2 extends PureComponent {
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
      <Container grayScale={grayScale}>
        <Image backgroundImage={coverImage} onClick={openDialog} />
        <Name onClick={openDialog}>{`${firstname} ${surname}`}</Name>
        {(role) &&
          <Role onClick={openDialog} color={mainColors[roleColor]}>{role}</Role>
        }
        {(socials && socials.length !== 0) &&
          <Socials>{this.renderSocials()}</Socials>
        }
      </Container>
    );
  }
}
