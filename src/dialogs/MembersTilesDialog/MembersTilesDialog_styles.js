import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import { colorPalette, media } from '../../utils/constants/styles';

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
  overflow: hidden;
  position: relative;
  top: -26px;
  left: -13px;
  box-sizing: border-box;
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 333px;
  min-height: 100px;
  max-height: 100px;
  margin: 26px 13px 0;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  font-size: 36px;
  color: ${colorPalette.accent2Color};
  transition: all 0.3s;
  ${media.x_large`
    width: 268px;
  `}
  ${media.large`
    width: 320px;
  `}
  ${media.medium`
    width: 463px;
    min-height: 70px;
    max-height: 70px;
    top: -10px;
    margin-top: 10px;
  `}

  > img {
    max-width: 80px;
    max-height: 80px;
    ${media.large__x_large`
      max-width: 75px;
      max-height: 75px;
    `}
    ${media.medium`
      max-width: 50px;
      max-height: 50px;
    `}
  }

  &:last-of-type {
    justify-content: center;

    &:hover {
      cursor: pointer;
      color: ${colorPalette.accent3Color};
    }
  }

  &:hover {
    color: ${colorPalette.accent3Color};
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 7px, rgba(0, 0, 0, 0.15) 0 2px 5px;
  }
`;

export const ElementContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: inherit;
  width: 185px;
  padding: 10px 0;
  ${media.x_large`
    width: 120px;
  `}
  ${media.large`
    width: 172px;
  `}
  ${media.medium`
    width: 315px;
  `}
`;

export const Name = styled.h3`
  font-size: 16px;
  line-height: 1.3;
  font-weight: 500;
  color: ${colorPalette.textColor};
`;

export const Role = styled.p`
  font-size: 14px;
  line-height: 1.3;
  color: ${colorPalette.accent3Color};
`;

export const ElementOptions = styled.div`
  width: 25px;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    color: ${colorPalette.textColor};
  }

  > i:first-child {
    margin-bottom: 15px;
    text-align: center;
    ${media.medium`
      margin-bottom: 5px;
    `}
  }
`;
