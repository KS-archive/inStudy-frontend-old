import styled from 'styled-components';
import { media, colorPalette } from '../../js/constants/styles';

export const ImageLink = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 163px;
  height: 163px;
  border: 1px solid ${colorPalette.accent2Color};
  filter: ${props => props.grayScale && 'grayscale(1)'};
  transition: all 0.3s;

  &:hover {
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    filter: grayscale(0);

    > img {
      max-width: 120px;
      max-height: 120px;
    }
  }

  ${media.xx_large`
    margin-right: 32px;
    margin-bottom: 32px;
    &:nth-child(6n) {
      margin-right: 0px;
    }
  `}
  ${media.large__x_large`
    margin-right: 32px;
    margin-bottom: 32px;
    &:nth-child(6n) {
      margin-right: 0px;
    }
  `}
  ${media.medium__large`
    margin-right: 21px;
    margin-bottom: 21px;

    &:nth-child(5n) {
      margin-right: 0px;
    }
  `}
  ${media.medium`
    margin: 0 30px 50px;
  `}
`;

export const Image = styled.img`
  max-width: 110px;
  max-height: 110px;
  transition: all 0.3s;
`;
