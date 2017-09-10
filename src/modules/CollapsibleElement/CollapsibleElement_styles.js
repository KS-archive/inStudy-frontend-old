import styled from 'styled-components';
import { colorPalette } from '../../js/constants/styles';

export const Element = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.active ? '100%' : '95%'};
  margin-bottom: 10px;
  transition: all 0.3s;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Title = styled.h2`
  user-select: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 500;
  color: #fff;
  background-color: ${props => props.backgroundColor};

  &:hover {
    cursor: pointer;
  }
`;

export const DescriptionContainer = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  height: ${props => props.active ? 'auto' : '0'};
  border-width: 1px;
  border-style: solid;
  border: 1px solid ${props => props.borderColor};
`;

export const Description = styled.p`
  padding: 20px 30px;
  line-height: 1.5;
  color: ${colorPalette.accent3Color};
`;
