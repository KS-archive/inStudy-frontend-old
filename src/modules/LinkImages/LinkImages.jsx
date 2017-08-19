import React, { Component } from 'react';
import { shuffle } from 'lodash';
import './linkImages.scss';

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      firstLoad: true,
      elements: [],
      grayScale: { filter: 'grayscale(0)' },
    };
  }

  componentWillMount() {
    if (this.state.grayScale.filter === 'grayscale(0)' && this.props.startGray) this.setState({ grayScale: { filter: 'grayscale(1)' } });
    const elements = (this.props.randomize && this.state.firstLoad) ? shuffle(this.props.content) : this.props.content;
    this.setState({ firstLoad: false, elements });
  }

  renderElement = () => this.state.elements.map((element, index) => {
    if (index < this.props.rowsLimit * 4 || this.state.showAll || !this.props.rowsLimit) {
      if (element.link) {
        return (
          <a href={element.link} className="linkImages__imageLink" key={element.name || `Obraz ${index}`} style={this.state.grayScale}>
            <img src={element.src} alt={element.name || `Obraz ${index}`} className="linkImages__image" />
          </a>
        );
      }
      return (
        <div className="linkImages__imageLink disabled" key={element.name || `Obraz ${index}`} style={this.state.grayScale}>
          <img src={element.src} alt={element.name || `Obraz ${index}`} className="linkImages__image" />
        </div>
      );
    }
    return null;
  });

  render() {
    const color = this.props.mainColors[this.props.color];
    return (
      <div className="collapsible__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="linkImages__container">
          {this.renderElement(this.props.content)}
        </div>
        {(!this.state.showAll && this.props.rowsLimit !== 0) &&
          <div className="linkImages__more" style={{ color }} onClick={() => { this.setState({ showAll: true }); }}>
            Pokaż wszystko <i className="fa fa-chevron-down" aria-hidden="true" />
          </div>
        }
        {(this.state.showAll && this.props.rowsLimit !== 0) &&
          <div className="linkImages__more" style={{ color }} onClick={() => { this.setState({ showAll: false }); }}>
            Zwiń listę <i className="fa fa-chevron-up" aria-hidden="true" />
          </div>
        }
      </div>
    );
  }
}
