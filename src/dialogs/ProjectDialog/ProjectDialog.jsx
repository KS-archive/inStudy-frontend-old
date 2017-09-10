import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import socialsList from '../../js/constants/socials';
import { BasicDialog } from '../../js/globalStyles';
import './projectDialog.scss';

export default class ProjectDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImage: null,
      prevImage: null,
      nextImage: null,
      images: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mainImage === null && nextProps.open) {
      const images = nextProps.images;
      if (!images.includes(nextProps.coverImage)) images.unshift(nextProps.coverImage);

      let nextImage = null; let prevImage = null; const mainImage = 0;

      if (images.length > 1) {
        nextImage = 1;
        prevImage = (images.length > 2) ? (images.length - 1) : 1;
      }

      this.setState({ images, prevImage, nextImage, mainImage });
    }
    if (!nextProps.open) {
      this.setState({ images: [], prevImage: null, nextImage: null, mainImage: null });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const mainImage = this.state.mainImage;
    const open = this.props.open;
    if (nextState.mainImage === mainImage && nextProps.open === open) return false;
    return true;
  }

  carouselRight = () => {
    const prevImage = this.state.mainImage;
    const mainImage = this.state.nextImage;
    const nextImage = (this.state.nextImage >= this.state.images.length - 1)
      ? 0
      : (this.state.nextImage + 1);

    this.setState({ prevImage, nextImage, mainImage });
  }

  carouselLeft = () => {
    const prevImage = (this.state.prevImage <= 0)
      ? (this.state.images.length - 1)
      : (this.state.prevImage - 1);
    const mainImage = this.state.prevImage;
    const nextImage = this.state.mainImage;

    this.setState({ prevImage, nextImage, mainImage });
  }

  renderSocials = () => this.props.socials.map(social => (
    <a className={`projectDialog__socialCircle social__${social.name} bg borderHover textHover`} href={social.link} key={social.name}>
      <i className={`fa fa-${social.name}`} aria-hidden="true" />
    </a>
  ));

  renderSocials = () => this.props.socials.map((social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <a
        className={`projectDialog__socialCircle social__${icon} bg borderHover textHover`}
        href={social.link}
        key={index}
        target="_blank"
      >
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </a>
    );
  });

  render() {
    const mainImage = { backgroundImage: `url(${this.state.images[this.state.mainImage]})` };
    return (
      <BasicDialog
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
        autoScrollBodyContent
      >
        <div className="projectDialog__images">
          <div className="projectDialog__mainImage" style={mainImage} />
          {(this.state.images.length > 1) &&
            <div className="projectDialog__carousel">
              <div className="projectDialog__arrow">
                <i className="fa fa-angle-left" aria-hidden="true" onClick={this.carouselLeft} />
              </div>
              <div className="projectDialog__carouselWrapper">
                <div className="projectDialog__miniImg" style={{ backgroundImage: `url(${this.state.images[this.state.prevImage]})` }} onClick={this.carouselLeft} />
                <div className="projectDialog__mainMiniImg" style={{ backgroundImage: `url(${this.state.images[this.state.mainImage]})` }} />
                <div className="projectDialog__miniImg" style={{ backgroundImage: `url(${this.state.images[this.state.nextImage]})` }} onClick={this.carouselRight} />
              </div>
              <div className="projectDialog__arrow">
                <i className="fa fa-angle-right" aria-hidden="true" onClick={this.carouselRight} />
              </div>
            </div>
          }
        </div>
        <div className="projectDialog__textContent">
          <h1 className="projectDialog__name">{this.props.name}</h1>
          {(this.props.header) &&
            <h2 className="projectDialog__header">{this.props.header}</h2>
          }
          <div className="projectDialog__description">
            {this.props.description &&
              <ReactMarkdown source={this.props.description} />
            }
          </div>
          {(this.props.socials && this.props.socials.length !== 0) &&
            <div className="projectDialog__socials">
              {this.renderSocials()}
            </div>
          }
        </div>
      </BasicDialog>
    );
  }
}
