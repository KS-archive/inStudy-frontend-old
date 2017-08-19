import React, { Component } from 'react';
import './linkImage.scss';

export default class LinkImage extends Component {
  render() {
    if (this.props.withLink) {
      return (
        <a href={this.props.link} className="linkImages__imageLink" style={this.props.grayScale}>
          <img src={this.props.src} alt={this.props.alt} className="linkImages__image" />
        </a>
      );
    }
    return (
      <div className="linkImages__imageLink disabled" style={this.props.grayScale}>
        <img src={this.props.src} alt={this.props.alt} className="linkImages__image" />
      </div>
    );
  }
}
