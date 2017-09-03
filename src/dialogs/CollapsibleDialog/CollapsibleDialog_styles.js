import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { colorPalette, media } from '../../js/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 26px;
`;

export const StyledTextField = styled(TextField)`
  width: 100% !important;
`;

export const ElementsList = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${colorPalette.textColor};
  }
`;

export const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 98%;
  min-height: 70px;
  padding: 10px 20px;
  margin: 2px 0 20px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  ${media.large`
    min-height: 90px;
  `}
  ${media.medium`
    min-height: 120px;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`;

export const Title = styled.h3`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
  color: ${colorPalette.primary1Color};
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
  color: ${colorPalette.accent3Color};
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10%;
  margin-left: auto;
`;

export const Icon = styled.i`
  font-size: 20px;
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  &:first-child {
    margin-bottom: 10px;
  }

  &:hover {
    cursor: pointer;
    color: ${colorPalette.textColor};
  }
`;

export const AddElement = styled.div`
  padding-top: 30px;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${colorPalette.primary1Color};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    color: ${colorPalette.primary2Color};
  }
`;
