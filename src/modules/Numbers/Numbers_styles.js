import styled from 'styled-components';
import { colorPalette } from '../../js/constants/styles';

export const Wrapper = styled.div`
  margin-bottom: -60px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
`;

export const Element = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin-bottom: 60px;
  padding: 0 40px;
`;

export const NumberField = styled.h1`
  font-size: 48px;
  font-weight: 500;
  color: ${props => props.color};
`;

export const Line = styled.div`
  width: 30px;
  height: 2px;
  margin: 10px 0;
  background-color: ${props => props.backgroundColor};
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.3;
  color: ${colorPalette.textColor};
`;
