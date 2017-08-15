import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.mainImage === this.state.mainImage && nextProps.open === this.props.open) return false;
    return true;
  }

  componentDidUpdate() {
    if (this.state.mainImage === null && this.props.open) {
      const images = this.props.images;
      images.unshift(this.props.coverImage);

      let nextImage = null; let prevImage = null; const mainImage = 0;

      if (images.length > 1) {
        nextImage = 1;
        prevImage = (images.length > 2) ? (images.length - 1) : 1;
      }

      this.setState({ images, prevImage, nextImage, mainImage });
    }
    if (!this.props.open) {
      this.setState({ images: [], prevImage: null, nextImage: null, mainImage: null });
    }
  }

  carouselRight = () => {
    const prevImage = this.state.mainImage;
    const mainImage = this.state.nextImage;
    const nextImage = (this.state.nextImage >= this.state.images.length - 1) ? 0 : (this.state.nextImage + 1);

    this.setState({ prevImage, nextImage, mainImage });
  }

  carouselLeft = () => {
    const prevImage = (this.state.prevImage <= 0) ? (this.state.images.length - 1) : (this.state.prevImage - 1);
    const mainImage = this.state.prevImage;
    const nextImage = this.state.mainImage;

    this.setState({ prevImage, nextImage, mainImage });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const mainImage = { backgroundImage: `url(${this.state.images[this.state.mainImage]})` };
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
        className="modal__container"
        bodyClassName="projectDialog__container"
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
                <div className="projectDialog__miniImg" style={{ backgroundImage: `url(${this.state.images[this.state.prevImage]})` }} />
                <div className="projectDialog__mainMiniImg" style={{ backgroundImage: `url(${this.state.images[this.state.mainImage]})` }} />
                <div className="projectDialog__miniImg" style={{ backgroundImage: `url(${this.state.images[this.state.nextImage]})` }} />
              </div>
              <div className="projectDialog__arrow">
                <i className="fa fa-angle-right" aria-hidden="true" onClick={this.carouselRight} />
              </div>
            </div>
          }
        </div>
        <div className="projectDialog__textContent">
          <h1 className="projectDialog__name">{this.props.name}</h1>
          <h2 className="projectDialog__header">{this.props.header}</h2>
          <p className="projectDialog__description">{this.props.description}</p>
        </div>
        <div className="projectDialog__socials"></div>
      </Dialog>
    );
  }
}
