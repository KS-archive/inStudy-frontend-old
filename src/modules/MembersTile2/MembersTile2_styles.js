import styled from 'styled-components';
import { media, colorPalette } from '../../js/constants/styles';

export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 265px;
  margin-bottom: 50px;
  filter: ${props => props.grayScale && 'grayscale(1)'};
  transition: all 0.3s;

  &:hover {
    filter: grayscale(0);
  }

  ${media.xx_large`
    margin-right: 25px;

    &:nth-child(4n),
    &:last-child { margin-right: 0 }
  `}
  ${media.large__x_large`
    margin-right: 25px;

    &:nth-child(4n),
    &:last-child { margin-right: 0 }
  `}
  ${media.medium__large`
    width: 273px;
    margin-right: 40px;

    &:nth-child(3n),
    &:last-child { margin-right: 0 }
  `}
  ${media.small__medium`
    width: 310px;
    margin-right: 40px;

    &:nth-child(2n) { margin-right: 0 }
  `}
  ${media.small`
    width: 300px;
  `}
`;

export const Image = styled.div`
  width: 165px;
  height: 165px;
  margin-bottom: 10px;
  border-radius: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.backgroundImage});

  &:hover {
    cursor: pointer;
  }
`;

export const Name = styled.h3`
  margin-bottom: 5px;
  font-size: 24px;
  text-align: center;
  font-weight: 500;
  line-height: 1.3;
  color: ${colorPalette.textColor};

  &:hover {
    cursor: pointer;
  }
`;

export const Role = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${props => props.color};

  &:hover {
    cursor: pointer;
  }
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  color: $divider-color;
  transition: all 0.3s;
`;

export const Social = styled.a`
  margin-right: 15px;
  color: ${colorPalette.accent2Color};

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }

  i {
    color: inherit;
  }
`;
