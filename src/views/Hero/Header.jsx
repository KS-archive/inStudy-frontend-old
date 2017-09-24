import React from 'react';
import { Helmet } from 'react-helmet';

export default () => (
  <Helmet>
    <title>inStudy - więcej niż studia!</title>
    <meta name="description" content="Największy portal gromadzący inicjatywy studenckie z całego Wrocławia. Wejdź i odnajdź ludzi, którzy uwielbiają to co Ty." />
    <meta property="og:title" content="inStudy - więcej niż studia!" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://instudy.pl" />
    <meta property="og:image" content="https://instudy.pl/img/Facebook-Open-Graph.jpg" />
    <meta property="og:description" content="Największy portal gromadzący inicjatywy studenckie z całego Wrocławia. Wejdź i odnajdź ludzi, którzy uwielbiają to co Ty." />
  </Helmet>
);
