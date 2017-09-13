import React, { PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '../../js/globalStyles';
import { Container } from './SimpleText_styles';

export default class SimpleText extends PureComponent {
  render() {
    const { title, content } = this.props;
    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <Container>
          <ReactMarkdown source={content} />
        </Container>
      </div>
    );
  }
}
