import styled from 'styled-components';
import { media, colorPalette } from '../../js/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;
