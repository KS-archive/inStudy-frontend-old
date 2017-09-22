import styled from 'styled-components';
import { colorPalette, media } from '../../utils/constants/styles';

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  ${media.medium`
    justify-content: center;
  `}
`;

export const More = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  margin: 0 auto;
  border: 1px solid ${colorPalette.accent2Color};
  padding-top: -5px;
  font-size: 24px;
  font-weight: 900;
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    border-color: ${colorPalette.accent3Color};
    background-color: ${colorPalette.accent3Color};
    color: #fff;
  }
`;
