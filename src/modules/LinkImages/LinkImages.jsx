import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import LinkImage from '../LinkImage/LinkImage';
import LinkImage2 from '../LinkImage2/LinkImage2';
import './linkImages.scss';

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noLimit: false,
      showAll: false,
      firstLoad: true,
      elements: [],
      grayScale: { filter: 'grayscale(0)' },
    };
  }

  componentWillMount() {
    if (this.state.grayScale.filter === 'grayscale(0)' && this.props.startGray) this.setState({ grayScale: { filter: 'grayscale(1)' } });
    const elements = (this.props.randomize && this.state.firstLoad)
      ? shuffle(this.props.content)
      : this.props.content;

    const type1Limit = this.props.type === 1 && elements.length <= 4 * this.props.rowsLimit;
    const type2Limit = this.props.type === 2 && elements.length <= 6 * this.props.rowsLimit;
    if ((type1Limit || type2Limit) && !this.state.noLimit) this.setState({ noLimit: true });

    this.setState({ firstLoad: false, elements });
  }

  renderElement = () => {
    let Image;
    let elementsInRow;
    switch (this.props.type) {
      case 1: Image = LinkImage; elementsInRow = 4; break;
      case 2: Image = LinkImage2; elementsInRow = 6; break;
      default: Image = null;
    }
    return this.state.elements.map((element, index) => {
      if (index < this.props.rowsLimit * elementsInRow || this.state.showAll || !this.props.rowsLimit) {
        return (
          <Image
            href={element.link}
            key={element.name || `Obraz ${index}`}
            src={element.src}
            alt={element.name || `Obraz ${index}`}
            grayScale={this.state.grayScale}
            withLink={!!element.link}
          />
        );
      }
      return null;
    });
  }

  render() {

    const color = this.props.mainColors[this.props.color];
    return (
      <div className="collapsible__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="linkImages__container">
          {this.renderElement(this.props.content)}
        </div>
        {(!this.state.showAll && this.props.rowsLimit !== 0 && !this.state.noLimit) &&
          <div className="linkImages__more" style={{ color }} onClick={() => { this.setState({ showAll: true }); }}>
            Pokaż wszystko <i className="fa fa-chevron-down" aria-hidden="true" />
          </div>
        }
        {(this.state.showAll && this.props.rowsLimit !== 0 && !this.state.noLimit) &&
          <div className="linkImages__more" style={{ color }} onClick={() => { this.setState({ showAll: false }); }}>
            Zwiń listę <i className="fa fa-chevron-up" aria-hidden="true" />
          </div>
        }
      </div>
    );
  }
}
