import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import socialsList from '../../utils/constants/socials';
import { BasicDialog } from '../../utils/globalStyles';
import { Images, MainImage, Carousel, Arrow, CarouselWrapper, MiniImage, ActiveMiniImg, TextContent, Name, Header, Description, Socials, SocialCircle } from './ProjectDialog_styles';

export default class ProjectDialog extends Component {
  constructor(props) {
    super(props);
    const { images, coverImage } = this.props;
    this.state = {
      mainImage: 0,
      prevImage: (images.length > 1) && ((images.length > 2) ? (images.length - 1) : 1),
      nextImage: (images.length > 1) && 1,
      images: [coverImage, ...images],
    };
  }

  carouselRight = () => {
    const { mainImage, nextImage, images } = this.state;
    this.setState({
      prevImage: mainImage,
      mainImage: nextImage,
      nextImage: (nextImage >= images.length - 1) ? 0 : (nextImage + 1),
    });
  }

  carouselLeft = () => {
    const { prevImage, mainImage, images } = this.state;
    this.setState({
      prevImage: (prevImage <= 0) ? (images.length - 1) : (prevImage - 1),
      mainImage: prevImage,
      nextImage: mainImage,
    });
  }

  renderSocials = () => this.props.socials.map((social, index) => {
    const icon = socialsList[social.id].iconName;
    console.log(icon);
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
    const { images, mainImage, prevImage, nextImage } = this.state;
    console.log(this.state);
    return (
      <BasicDialog
        open={open}
        onRequestClose={closeDialog}
        autoScrollBodyContent
      >
        <Images>
          <MainImage src={images[mainImage]} />
          {(images.length > 1) &&
            <Carousel>
              <Arrow>
                <i className="fa fa-angle-left" aria-hidden="true" onClick={this.carouselLeft} />
              </Arrow>
              <CarouselWrapper>
                <MiniImage style={{ backgroundImage: `url(${images[prevImage]})` }} onClick={this.carouselLeft} />
                <ActiveMiniImg style={{ backgroundImage: `url(${images[mainImage]})` }} />
                <MiniImage style={{ backgroundImage: `url(${images[nextImage]})` }} onClick={this.carouselRight} />
              </CarouselWrapper>
              <Arrow>
                <i className="fa fa-angle-right" aria-hidden="true" onClick={this.carouselRight} />
              </Arrow>
            </Carousel>
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
