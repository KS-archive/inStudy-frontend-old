import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import socialsList from '../../../utils/constants/socials';
import { BasicDialog } from '../../../utils/globalStyles';
import { Images, MainImage, StyledImageGallery, TextContent, Name, Header, Description, Socials, SocialCircle } from './ProjectDialog_styles';

export default class ProjectDialog extends Component {
  constructor(props) {
    super(props);
    const { images, coverImage } = this.props;
    const imagesArr = [coverImage, ...images];
    const imagesObj = imagesArr.map((img) => {
      return {
        original: img,
        thumbnail: img,
      };
    });
    this.state = {
      images: imagesObj,
    };
  }

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
    const { open, closeDialog, title, header, description, socials } = this.props;
    const { images } = this.state;
    return (
      <BasicDialog
        open={open}
        onRequestClose={closeDialog}
        autoScrollBodyContent
      >
        <Images>
          {images.length === 1
            ? <MainImage src={images[0].original} />
            : <StyledImageGallery
              items={images}
              slideInterval={2000}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          }
        </Images>
        <TextContent>
          <Name>{title}</Name>
          {(header) && <Header>{header}</Header>}
          <Description>
            {description && <ReactMarkdown source={description} />}
          </Description>
          {(socials && socials.length !== 0) &&
            <Socials>{this.renderSocials()}</Socials>
          }
        </TextContent>
      </BasicDialog>
    );
  }
}
