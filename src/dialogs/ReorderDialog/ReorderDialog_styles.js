import styled from 'styled-components';
import { colorPalette, media } from '../../utils/constants/styles';

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
  z-index: 5000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
  margin: 10px 0;
  padding-left: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 500;
  color: ${colorPalette.textColor};

  &:hover {
    cursor: grab;
    box-shadow: rgba(0, 0, 0, 0.14) 0 2px 7px, rgba(0, 0, 0, 0.14) 0 2px 5px;
  }

  i {
    margin-right: 30px;
    font-size: 30px;
    color: ${colorPalette.accent2Color};
  }
`;
