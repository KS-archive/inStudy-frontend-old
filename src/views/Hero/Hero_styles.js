import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { colorPalette } from '../../js/constants/styles';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.isIE && `${colorPalette.primary2Color}`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-image: url('/img/hero_bg.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: ${colorPalette.primary2Color};
    background-blend-mode: multiply;
    filter: contrast(120%) saturate(75%) brightness(110%);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 50px;

  @media (max-height: 800px) {
    width: 150px;
    height: 150px;
    margin-bottom: 30px;
  }
`;

export const Text = styled.h1`
  margin-bottom: 40px;
  font-size: 48px;
  color: #fff;
  text-align: center;

  @media (max-height: 800px) {
    margin-bottom: 40px;
    font-size: 36px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 470px) {
    flex-wrap: wrap;
  }
`;

export const StyledRaisedButton = styled(RaisedButton)`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  font-weight: 500;

  @media (max-width: 470px) {
    margin-top: 20px;
    margin-right: 30px !important;
    margin-left: 30px !important;
  }

  &:first-child {
    margin-right: 20px !important;

    > button > div > div > span {
      color: ${colorPalette.primary2Color} !important;
    }
  }

  &:last-child {
    border: 1px solid #fff !important;
    box-shadow: none !important;
    background-color: transparent !important;

    > button {
      background-color: transparent !important;
    }

    > button > div > div > span {
      color: #fff !important;
    }
  }

  > button > div > div > span {
    font-size: 16px !important;
  }
`;
