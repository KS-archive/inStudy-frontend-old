import styled from 'styled-components';
import { media, colorPalette } from '../../../utils/constants/styles';

export const Form = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;

export const LabelHeader = styled.h4`
  margin: 30px 0 0;
  font-size: 14px;
  font-weight: 500;
  align-self: flex-start;
  color: ${colorPalette.primary1Color};
`;
