import styled from 'styled-components';
import { colorPalette } from '../../utils/constants/styles';

export const Container = styled.div`
  text-align: center;
  line-height: 1.5;
  white-space: pre-wrap;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    color: ${colorPalette.textColor};
  }

  ol { list-style: decimal; }
  ul { list-style: disc; }

  a {
    color: ${colorPalette.primary1Color} !important;
    text-decoration: underline !important;
  }

  strong { font-weight: 500; }
  h1 { font-size: 48px; }
  h2 { font-size: 36px; }
  h3 { font-size: 30px; }
  h4 { font-size: 24px; }
  h5 { font-size: 20px; }

  h6 {
    font-size: 16px;
    text-transform: uppercase;
  }

  p,
  ol,
  ul {
    font-size: 20px;
    color: ${colorPalette.accent3Color};
    margin-bottom: 10px;
  }
`;
