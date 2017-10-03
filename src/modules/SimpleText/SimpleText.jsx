import React, { PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '../../utils/globalStyles';
import { Container, StyledRaisedButton } from './SimpleText_styles';

export default class SimpleText extends PureComponent {
  render() {
    const { title, content, buttonLabel, buttonLink, mainColors, color } = this.props;
    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <Container>
          <ReactMarkdown source={content} />
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
