import styled from 'styled-components';
import { media, colorPalette } from '../../js/constants/styles';

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 265px;
  border-radius: 2px 2px 0 0;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  filter: ${props => props.grayScale && 'grayscale(1)'};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    filter: grayscale(0);
  }

  ${media.xx_large`
    margin-right: 25px;
    margin-bottom: 25px;

    &:nth-child(4n),
    &:last-child { margin-right: 0 }
  `}
  ${media.large__x_large`
    margin-right: 25px;
    margin-bottom: 25px;

    &:nth-child(4n),
    &:last-child { margin-right: 0 }
  `}
  ${media.medium__large`
    width: 273px;
    margin-right: 40px;
    margin-bottom: 40px;

    &:nth-child(3n),
    &:last-child { margin-right: 0 }
  `}
  ${media.small__medium`
    width: 310px;
    margin-right: 40px;
    margin-bottom: 40px;

    &:nth-child(2n) { margin-right: 0 }
  `}
  ${media.small`
    width: 300px;
    margin-bottom: 40px;
  `}
`;

export const Image = styled.div`
  width: 265px;
  height: 265px;
  border-radius: 2px 2px 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.backgroundImage});

  &:hover {
    cursor: pointer;
  }

  ${media.medium__large`
    width: 273px;
    height: 273px;
  `}
  ${media.small__medium`
    width: 310px;
    height: 310px;
  `}
  ${media.small`
    width: 300px;
    height: 300px;
  `}
`;

export const Data = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 5px;

  &:hover {
    cursor: pointer;
  }
`;

export const Name = styled.h3`
  margin-bottom: 5px;
  font-size: 24px;
  color: ${colorPalette.textColor};
  text-align: center;
  font-weight: 500;
  line-height: 1.3;
`;

export const Role = styled.p`
  text-align: center;
  line-height: 1.3;
  color: ${props => props.color};
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 45px;
  margin-top: auto;
  font-size: 24px;
  text-align: center;
  background-color: #eef1fe;
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  &:hover {
    cursor: default !important;
  }
`;

export const Social = styled.a`
  margin-right: 15px;

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }
`;
