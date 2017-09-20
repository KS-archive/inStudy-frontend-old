import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import { colorPalette, media, navHeight, sidebarWidth } from '../../js/constants/styles';

const titleHeight = 50;

export const Container = styled.div`
  z-index: 2001;
  position: fixed;
  top: ${navHeight}px;
  left: ${props => props.open ? 0 : `-${sidebarWidth}px`};
  width: ${sidebarWidth}px;
  height: calc(100vh - ${navHeight}px);
  background-color: ${colorPalette.primary2Color};
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  transition: all 0.3s linear;

  > div:first-child {
    left: ${props => props.open || 0};
  }

  ${media.small`
    display: none;
  `}
`;

export const ContainerArrow = styled.div`
  z-index: 0;
  position: fixed;
  top: ${navHeight + 40}px;
  left: ${sidebarWidth}px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 80px;
  border-radius: 0 2px 2px 0;
  background-color: ${colorPalette.primary2Color};
  box-shadow: rgba(0, 0, 0, 0.16) 4px 3px 7px, rgba(0, 0, 0, 0.23) 4px 3px 7px;
  transition: all 0.3s linear;

  &:hover {
    cursor: pointer;
  }

  i {
    font-size: 18px;
    color: #fff;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: ${titleHeight}px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.3;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
`;

export const Modules = styled(Scrollbars)`
  position: relative;
  top: ${titleHeight + 15}px;
  left: 0;
  right: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - ${navHeight}px - ${titleHeight}px - 140px) !important;
  width: ${sidebarWidth - 20}px !important;

  > div {
    overflow: hidden !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 55px;
  max-height: 55px;
  min-width: 55px;
  min-height: 55px;
  border-radius: 100%;
  margin-top: 15px;
  background-color: #fff;
  font-size: 24px;
  color: ${colorPalette.primary2Color};
  opacity: 0.8;
  transition: all 0.3s;

  &:last-child {
    margin-bottom: 20px;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const SidebarIcon = styled.div`
  > svg {
    max-width: 24px;
    max-height: 24px;
    fill: ${colorPalette.primary2Color};
  }
`;

export const EditIconSet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const BottomIcons = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    padding: 0 !important;
  }
`;

export const StyledReactTooltip = styled(ReactTooltip)`
  z-index: 20000 !important;
  font-size: 16px !important;
  transition: opacity 0.3s !important;
`;

export const SpecialBtn = styled.i`
  font-size: 30px;
  color: #fff;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.i`
  margin-top: 15px !important;
  font-size: 30px;
  color: #fff;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
  }

  &:first-child {
    margin-top: 0;
  }
`;

export const Filler = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  color: transparent;
  transition: all 0.3s;
  ${media.small`
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
  `}
`;

export const ShadowTop = styled.div`
  z-index: -1;
  position: fixed;
  left: 15px;
  height: 10px;
  width: 80px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
`;

export const ShadowBottom = styled.div`
  z-index: -1;
  position: fixed;
  bottom: 120px;
  left: 15px;
  height: 10px;
  width: 80px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
`;
