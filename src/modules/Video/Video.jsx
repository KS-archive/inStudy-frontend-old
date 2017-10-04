import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '../../utils/globalStyles';
import { Container, StyledReactPlayer, StyledRaisedButton } from './Video_styles';

export default class Video extends Component {
  render() {
    const { title, content, url, buttonLabel, buttonLink, mainColors, color } = this.props;
    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <Container>
          <ReactMarkdown source={content} />
          <StyledReactPlayer controls playsInline url={url} />
          {(buttonLabel && buttonLink) &&
            <StyledRaisedButton
              label={buttonLabel}
              onClick={() => { window.open(buttonLink, '_blank'); }}
              color={mainColors[color] || mainColors[2]}
            />
          }
        </Container>
      </div>
    );
  }
}
