import styled from 'styled-components';
import { colorPalette } from '../../js/constants/styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${colorPalette.primary2Color};

  @media (max-width: 800px) {
    min-height: calc(100vh - 60px);
    padding-top: 60px;
  }

  @media (max-height: 900px) {
    min-height: calc(100vh - 60px);
    padding-top: 60px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 450px;
  padding: 40px 50px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media (max-width: 500px) {
    width: 328px;
    padding: 40px 10px;
  }
`;

export const Header = styled.h1`
  width: 650px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  order: 11;
`;
