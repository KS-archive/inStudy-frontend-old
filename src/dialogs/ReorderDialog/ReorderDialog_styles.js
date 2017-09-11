import styled from 'styled-components';
import { colorPalette, media } from '../../js/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;

export const ListContainer = styled.div`
  width: 100%;
`;

export const ListElement = styled.div`
  user-select: none;
  margin: 10px 0;
  width: 100%;
  min-height: 40px;
  background-color: #ddd;
  z-index: 5000;

  &:hover {
    cursor: grab;
  }
`;
