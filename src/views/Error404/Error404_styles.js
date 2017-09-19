import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { colorPalette } from '../../js/constants/styles';

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colorPalette.primary2Color};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

export const MainNumber = styled.h1`
  font-size: 300px;
  font-weight: 300;
`;

export const Description = styled.p`
  margin-bottom: 60px;
  font-size: 32px;
  line-height: 1.3;
  font-weight: 300;
`;

export const Button = styled(RaisedButton)`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  font-weight: 500;

  border: 1px solid #fff !important;
  box-shadow: none !important;
  background-color: transparent !important;

  > button {
    background-color: transparent !important;
  }

  > button > div > div > span {
    color: #fff !important;
  }
`;