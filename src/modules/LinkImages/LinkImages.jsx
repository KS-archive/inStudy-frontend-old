import React, { Component } from 'react';
import shuffle from 'lodash/shuffle';
import LinkImage from './Types/LinkImage/LinkImage';
import LinkImage2 from './Types/LinkImage2/LinkImage2';
import { SectionHeader } from '../../utils/globalStyles';
import { Container, Toggle } from './LinkImages_styles';

export default class LinkImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  componentWillMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  initialize = (props) => {
    const { randomize, content, startGray, rowsLimit, type } = props;
    switch (type) {
      case 0: this.type = {
        elementsInRow: 4,
        imageComponent: LinkImage,
      }; break;
      default: this.type = {
        elementsInRow: 6,
        imageComponent: LinkImage2,
      }; break;
    }
    this.setState({
      noLimit: content.length <= this.type.elementsInRow * rowsLimit,
      elements: randomize ? shuffle(content) : content,
      grayScale: startGray,
    });
  }

  toggleList = () => {
    this.setState({ showAll: !this.state.showAll });
  }

  renderElement = () => {
    const Image = this.type.imageComponent;
    const elementsInRow = this.type.elementsInRow;
    const { rowsLimit } = this.props;
    const { grayScale } = this.state;

    return this.state.elements.map((element, index) => {
      const { link, name, src } = element;
      const alt = name || `Obraz ${index}`;
      const isInLimit = (index < rowsLimit * elementsInRow || this.state.showAll || !rowsLimit);
      const attrs = { link, src, alt, grayScale };

      return isInLimit && <Image key={alt} {...attrs} />;
    });
  }

  renderToggleLink = () => {
    const color = this.props.mainColors[this.props.color];
    const [text, arrow] = (this.state.showAll)
      ? ['Zwiń listę', 'up']
      : ['Pokaż wszystko', 'down'];

    return (
      <Toggle color={color} onClick={this.toggleList} >
        {text}
        <i className={`fa fa-chevron-${arrow}`} aria-hidden="true" />
      </Toggle>
    );
  }

  render() {
    const { title, rowsLimit } = this.props;
    const { noLimit } = this.state;
    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <Container>
          {this.renderElement()}
        </Container>
        {(rowsLimit !== 0 && !noLimit) && this.renderToggleLink() }
      </div>
    );
  }
}
