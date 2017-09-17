import React, { Component } from 'react';
import socialsList from '../../js/constants/socials';
import { StyledDialog, Image, Name, Role, Line, Description, Socials, SocialCircle } from './MembersDialog_styles';

export default class MembersDialog extends Component {
  parseNewLine = text => text && text.split('\n').map((item, i) => <span key={i}>{item}<br /></span>);

  renderSocials = () => this.props.socials.map((social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <SocialCircle
        className={`social__${icon} bg borderHover textHover`}
        href={social.link}
        key={index}
        target="_blank"
      >
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </SocialCircle>
    );
  });

  render() {
    const { open, closeDialog, coverImage, firstname, surname, role, socials, description, color } = this.props;
    return (
      <StyledDialog open={open} onRequestClose={closeDialog} autoScrollBodyContent>
        <Image src={coverImage} />
        <Name>{`${firstname} ${surname}`}</Name>
        <Role display={role} color={color}>{role}</Role>
        <Line display={(socials && socials.length) !== 0 || description} />
        <Description display={description}>{this.parseNewLine(description)}</Description>
        {(socials && socials.length !== 0) &&
          <Socials>{this.renderSocials()}</Socials>
        }
      </StyledDialog>
    );
  }
}
