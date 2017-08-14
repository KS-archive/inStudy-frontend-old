import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './simpleText.scss';

export default class SimpleText extends Component {
  render() {
    return (
      <div className="simpleText__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="simpleText__container" style={{ textAlign: this.props.textAlign }}>
          <ReactMarkdown source={this.props.content} />
        </div>
      </div>
    );
  }
}
