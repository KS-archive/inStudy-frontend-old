import styled from 'styled-components';
import { media } from '../../../utils/constants/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 530px;
  margin-right: 80px;
  margin-bottom: 60px;

  &:nth-child(even) { margin-right: 0; }

  ${media.large`
    width: 410px;
  `}
  ${media.medium`
    margin-right: 0;
    width: 533px;
  `}
  ${media.small`
    width: 90vw;
  `}
`;

export const ImageWrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 277px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: url("${props => props.background}") no-repeat center/cover;
  transition: all 0.3s;
  ${media.large`
    height: 214px;
  `}
  ${media.medium`
    height: 278px;
  `}
  ${media.small`
    height: 47vw;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  `}

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 2px 3px rgba(0, 0, 0, 0.3);
  }
`;

export const Label = styled.p`
  box-sizing: border-box;
  position: absolute;
  z-index: 1;
  right: -2px;
  height: 30px;
  min-width: 150px;
  padding: 0 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  line-height: 30px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  background-color: ${props => props.backgroundColor};

  &:nth-of-type(1) { top: 30px; }
  &:nth-of-type(2) { top: 70px; }
  &:nth-of-type(3) { top: 110px; }
  &:nth-of-type(4) { top: 150px; }

  ${media.x_small`
    display: none;
  `}
`;

export const Name = styled.div`
  margin-top: 20px;
  padding: 0 20px;
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;
