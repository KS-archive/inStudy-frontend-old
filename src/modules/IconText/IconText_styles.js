import styled from 'styled-components';
import Linkify from 'linkifyjs/react';
import { colorPalette, media } from '../../utils/constants/styles';

export const Wrapper = styled.div`
  margin-bottom: -60px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
`;

export const Element = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-bottom: 60px;
  padding: 0 40px;
  ${media.medium`
    width: 500px;
  `}

  @media (max-width: 500px) {
    padding: 0;
  }
`;

export const Icon = styled.i`
  margin-bottom: 30px;
  font-size: 48px !important;
  color: ${props => props.color};
`;

export const Title = styled.h3`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  color: ${colorPalette.textColor};
  ${media.medium`
    font-size: 22px;
  `}
`;

export const Description = styled(Linkify)`
  display: inline-block;
  color: ${colorPalette.accent3Color};
  line-height: 1.5;
  ${media.medium`
    font-size: 18px;
  `}

  a {
    color: ${props => props.linkColor} !important;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
