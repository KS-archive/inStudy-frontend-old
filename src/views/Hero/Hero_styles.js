import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { colorPalette } from '../../utils/constants/styles';

export const Background = styled.canvas`
  z-index: -1;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-image: url('/img/hero-background.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: 0.8;
  }
`;

export const Content = styled.div`
  position: relative;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 50px;

  @media (max-width: 470px) {
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
  }
`;

export const Text = styled.h1`
  padding: 0 20px;
  margin-bottom: 40px;
  font-size: 48px;
  color: #fff;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 600px) {
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
    margin-right: 30px !important;
    margin-left: 30px !important;
  }

  &:first-child {
    > button > div > div > span {
      color: ${colorPalette.primary2Color} !important;
    }
  }

  &:nth-last-child(-n+2):first-child ~ &:nth-child(2) {
    margin-left: 20px !important;
    border: 1px solid #fff !important;
    box-shadow: none !important;
    background-color: transparent !important;

    @media (max-width: 470px) {
      margin-top: 20px !important;
      margin-left: 30px !important;
    }

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
