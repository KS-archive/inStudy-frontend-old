import React, { Component } from 'react';
import './linkImage2.scss';

export default class LinkImage2 extends Component {
  render() {
    if (this.props.withLink) {
      return (
        <a href={this.props.link} className="linkImages2__imageLink" style={this.props.grayScale}>
          <img src={this.props.src} alt={this.props.alt} className="linkImages2__image" />
        </a>
      );
    }
    return (
      <div className="linkImages2__imageLink disabled" style={this.props.grayScale}>
        <img src={this.props.src} alt={this.props.alt} className="linkImages2__image" />
      </div>
    );
  }
}
