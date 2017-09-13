import React, { PureComponent } from 'react';
import { ImageLink, Image } from './LinkImage2_styles';

export default class LinkImage2 extends PureComponent {
  render() {
    const { grayScale, link, src, alt } = this.props;
    const href = link ? { href: link } : {};

    return (
      <ImageLink disabled={!link} grayScale={grayScale} {...href}>
        <Image src={src} alt={alt} />
      </ImageLink>
    );
  }
}
