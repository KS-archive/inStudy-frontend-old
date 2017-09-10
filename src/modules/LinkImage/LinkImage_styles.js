import styled from 'styled-components';
import { media } from '../../js/constants/styles';

export const ImageLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 266px;
  height: 150px;
  margin-bottom: 60px;
  filter: ${props => props.grayScale && 'grayscale(1)'};
  transition: all 0.3s;

  &:hover {
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    filter: grayscale(0);
  }

  ${media.xx_large`
    &:nth-child(4n - 2) {
      margin-left: 25px;
      margin-right: 12px;
    }

    &:nth-child(4n - 1) {
      margin-left: 13px;
      margin-right: 25px;
    }
  `}
  ${media.large__x_large`
    &:nth-child(4n - 2) {
      margin-left: 25px;
      margin-right: 12px;
    }

    &:nth-child(4n - 1) {
      margin-left: 13px;
      margin-right: 25px;
    }
  `}
  ${media.medium__large`
    &:nth-child(3n) { margin-left: 51px; }
    &:nth-child(3n - 2) { margin-right: 51px; }
  `}
  ${media.medium`
    margin: 0 22px 60px;
  `}
`;

export const Image = styled.img`
  max-width: 266px;
  max-height: 150px;
`;
