import styled from 'styled-components';
import { media, colorPalette } from '../../../js/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;

export const LabelHeader = styled.h4`
  margin: 20px 0 15px;
  font-size: 14px;
  font-weight: 500;
  color: ${colorPalette.primary1Color};
`;

export const IconImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  min-height: 50px;
  border: 1px solid ${colorPalette.accent2Color};
  border-radius: 100%;
  color: ${colorPalette.accent2Color};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    border: 1px solid ${colorPalette.primary1Color};
    color: ${colorPalette.primary1Color};
  }
`;

export const IconImage = styled.i`
  font-size: 24px;
  text-align: center;
  color: inherit;
`;
