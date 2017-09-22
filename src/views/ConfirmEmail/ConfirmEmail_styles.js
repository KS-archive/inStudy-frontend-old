import styled from 'styled-components';
import { colorPalette } from '../../utils/constants/styles';

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

export const Header = styled.p`
  width: 360px;
  margin-bottom: 30px;
  font-size: 24px;
  text-align: center;
  line-height: 1.5;
  color: #fff;
`;
