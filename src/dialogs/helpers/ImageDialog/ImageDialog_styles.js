import styled from 'styled-components';
import { colorPalette } from '../../../utils/constants/styles';

export const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

export const InfoIcon = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  background-color: ${colorPalette.accent1Color};
  text-align: center;
  color: #fff;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
    background-color: darken(${colorPalette.accent1Color}, 5%);
  }
`;
