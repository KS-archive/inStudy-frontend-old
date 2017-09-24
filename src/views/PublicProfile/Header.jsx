import React from 'react';
import { Helmet } from 'react-helmet';

export default props => (
  <Helmet>
    <title>{props.title}</title>
    <meta name="description" content={props.description} />
    <meta property="og:title" content={props.title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={props.url} />
    <meta property="og:image" content={props.ogImage} />
    <meta property="og:description" content={props.description} />
  </Helmet>
);
