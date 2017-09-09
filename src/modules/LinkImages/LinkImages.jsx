import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import LinkImage from '../LinkImage/LinkImage';
import LinkImage2 from '../LinkImage2/LinkImage2';
import { SectionHeader } from '../../js/globalStyles';
import { Container, Toggle } from './LinkImages_styles';

export default class LinkImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noLimit: false,
      showAll: false,
      firstLoad: true,
      elements: [],
      grayScale: { filter: 'grayscale(0)' },
    };
    switch (this.props.type) {
      case 0: this.type = {
        elementsInRow: 4,
        imageComponent: LinkImage,
      }; break;
      default: this.type = {
        elementsInRow: 6,
        imageComponent: LinkImage2,
      }; break;
    }
  }

  componentWillMount() {
    const { grayScale: { filter }, firstLoad, noLimit } = this.state;
    const { randomize, content, rowsLimit, startGray } = this.props;
    const elements = (randomize && firstLoad) ? shuffle(content) : content;
    const limit = elements.length <= this.type.elementsInRow * rowsLimit;

    if (filter === 'grayscale(0)' && startGray) this.setState({ grayScale: { filter: 'grayscale(1)' } });
    if (limit && !noLimit) this.setState({ noLimit: true });

    this.setState({ firstLoad: false, elements });
  }

  renderElement = () => {
    const Image = this.type.imageComponent;
    const elementsInRow = this.type.elementsInRow;

    return this.state.elements.map((element, index) => {
      const { rowsLimit } = this.props;
      const { grayScale } = this.state;
      const { link, name, src } = element;
      const imgName = name || `Obraz ${index}`;

      return (index < rowsLimit * elementsInRow || this.state.showAll || !rowsLimit) &&
        <Image href={link} key={imgName} src={src} alt={imgName} grayScale={grayScale} withLink={!!link} />
    });
  }

  renderToggleLink = (showAll) => {
    const color = this.props.mainColors[this.props.color];
    const [text, arrow] = (showAll)
      ? ['Zwiń listę', 'up']
      : ['Pokaż wszystko', 'down'];
    return (
      <Toggle
        style={{ color }}
        onClick={() => { this.setState({ showAll: !showAll }); }}
      >
        {text} <i className={`fa fa-chevron-${arrow}`} aria-hidden="true" />
      </Toggle>
    );
  }

  render() {
    const { title, rowsLimit, content } = this.props;
    const { showAll, noLimit } = this.state;
    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <Container>
          {this.renderElement(content)}
        </Container>
        {(rowsLimit !== 0 && !noLimit) && this.renderToggleLink(showAll) }
      </div>
    );
  }
}
