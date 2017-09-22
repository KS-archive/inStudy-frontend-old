import styled from 'styled-components';
import { media, colorPalette } from '../../utils/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;

export const IconWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  margin: 10px;
  border: 1px solid ${props => props.active ? colorPalette.primary1Color : colorPalette.accent2Color};
  color: ${props => props.active ? colorPalette.primary1Color : colorPalette.accent2Color};
  border-radius: 100%;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    border: 1px solid ${colorPalette.primary1Color};
    color: ${colorPalette.primary1Color};
  }
`;
export const Icon = styled.div`
  font-size: 20px;
  text-align: center;
  color: inherit;
`;
