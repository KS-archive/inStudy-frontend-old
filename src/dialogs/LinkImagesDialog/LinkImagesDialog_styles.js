import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import { colorPalette, media } from '../../js/constants/styles';

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

export const Checkboxes = styled.div`
  display: flex;
  min-height: 24px;
  margin-top: 10px;
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 20px;
  width: 200px !important;

  &:last-child {
    width: 240px !important;
    margin-right: 0;
  }
`;

export const Types = styled.div`
  display: flex;
  min-height: 50px;
  margin-bottom: 20px;
`;

export const Type = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  border: ${props => props.selected
    ? `2px solid ${colorPalette.primary1Color}`
    : `1px solid ${colorPalette.accent2Color}`};
  border-radius: 2px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }

  > img {
    max-width: 36px;
    max-height: 36px;
  }
`;

export const LabelHeader = styled.h4`
  margin: 20px 0 15px;
  font-size: 14px;
  font-weight: 500;
  color: ${colorPalette.primary1Color};
`;

export const Elements = styled.div`
  width: 100%;
`;

export const Element = styled.div`
  position: relative;
  top: -26px;
  left: -13px;
  box-sizing: border-box;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  min-height: 100px;
  margin: 26px 13px 0;
  border: 2px solid ${colorPalette.accent2Color};
  font-size: 36px;
  color: ${colorPalette.accent2Color};
  transition: all 0.3s;

  > img {
    max-width: 65px;
    max-height: 65px;
  }

  &:hover {
    cursor: pointer;
    color: ${colorPalette.accent3Color};

    > div {
      z-index: 1;
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const ElementOptionsOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: -2;
  transition: opacity 0.3s;
  cursor: default;
`;

export const ElementOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  font-size: 24px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;
