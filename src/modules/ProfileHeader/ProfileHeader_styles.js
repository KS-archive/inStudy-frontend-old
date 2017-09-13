import styled from 'styled-components';
import { colorPalette, media } from '../../js/constants/styles';

export const Background = styled.div`
  z-index: -1;
  position: absolute;
  top: ${props => props.editable ? 0 : '60px'};
  right: 0;
  left: 0;
  width: 100%;
  height: 40vw;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${props => props.backgroundImage ? props.backgroundImage : '/img/hero_bg.svg'});
  background-color: ${props => !props.backgroundImage && props.color};
  background-blend-mode: ${props => !props.backgroundImage && 'multiply'};

  @media (min-width: 1440px) {
    height: 600px;
  }

  @media (max-width: 800px) {
    height: 350px;
  }
`;

export const BackgroundEditIcon = styled.i`
  position: absolute;
  right: 30px;
  top: 90px;
  font-size: 36px;
  color: #fff;
  opacity: 0.6;
  transition: opacity 0.3s;
  ${media.small`
    display: none;
  `}

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
`;

export const CardEditIcon = styled.i`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 36px;
  color: ${colorPalette.accent3Color};
  opacity: 0.6;
  transition: opacity 0.3s;
  ${media.small`
    display: none;
  `}

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const MainData = styled.div`
  display: flex;
  padding: 60px 50px;
  background-color: #fff;
  ${media.medium`
    flex-direction: column;
    align-items: center;
  `}
`;

export const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 310px;
  margin-right: 60px;
  ${media.medium`
    margin-right: 0;
    margin-bottom: 60px;
  `}
  ${media.small`
    max-width: 310px;
    width: 95%;
  `}
`;

export const Logo = styled.img`
  max-width: 95%;
  max-height: 95%;
`;

export const LogoEditOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  ${media.small`
    display: none;
  `}

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.6);

    i {
      opacity: 1;
    }
  }

  i {
    opacity: 0.6;
    color: #fff;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${media.medium`
    align-items: center;
    width: 100%;
  `}
`;

export const CircleName = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: 500;
  line-height: 1.3;
  color: ${colorPalette.textColor};
  ${media.medium`
    width: 100%;
    text-align: center;
  `}
`;

export const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  ${media.medium`
    width: 100%;
    justify-content: center;
  `}
`;

export const Label = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin: 0 20px 10px 0;
  padding: 0 20px;
  border-radius: 2px;
  font-weight: 500;
  text-align: center;
  color: #fff;

  &:last-child {
    margin-right: 0;
  }

  ${media.medium`
    margin: 0 10px 10px;

    &:last-child {
      margin-right: 10px;
    }
  `}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${media.medium`
    width: 100%;
    align-items: center;
  `}
  ${media.small`
    align-items: stretch;
  `}
`;

export const TextRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  ${media.small`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Name = styled.p`
  display: flex;
  align-items: center;
  min-width: 200px;
  color: $primary-text-color;
  font-weight: 500;
  text-transform: uppercase;
  ${media.small`
    min-width: unset;
    margin-bottom: 5px;
    font-size: 20px;
    text-align: center;
  `}
`;

export const Value = styled.p`
  display: flex;
  align-items: center;
  color: ${colorPalette.accent3Color};
  line-height: 1.3;
  ${media.medium`
    width: 300px;
  `}
  ${media.small`
    width: unset;
    font-size: 20px;
    text-align: center;
  `}
`;

export const SocialsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: ${props => props.backgroundColor};
`;

export const SocialsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SocialsEditOverlay = styled.div`
  font-size: 24px;
  text-align: center;
  color: #fff;
  opacity: 0.6;
  transition: opacity 0.3s;
  ${media.small`
    display: none;
  `}

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const Social = styled.a`
  margin-right: 40px;
  font-size: 24px;
  text-align: center;
  color: #fff;

  i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    color: inherit;
    transition: all 0.3s;

    &:hover {
      cursor: pointer;
      background-color: #fff;
    }
  }

  &:last-child {
    margin-right: 0;
  }

  ${media.small`
    &:nth-last-child(2) {
      margin-right: 0;
    }
  `}
`;
