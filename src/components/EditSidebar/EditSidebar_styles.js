import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { colorPalette, media } from '../../js/constants/styles';

export const Container = styled.div`
  z-index: 2001;
  position: fixed;
  top: 60px;
  left: ${props => props.open ? 0 : '-150px'};
  width: 150px;
  height: 100vh;
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
  top: 100px;
  left: 150px;
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 15px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  font-size: 18px;
  line-height: 1.3;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
`;

export const Modules = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: calc(100vh - 310px);
  margin: 20px 0;

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: trensparent;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: trensparent;
    transition: all 0.3s;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(#fff, 0.2);
    transition: all 0.3s;

    &:hover {
      background-color: rgba(#fff, 0.8);
    }
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 60px;
  max-height: 60px;
  min-width: 60px;
  min-height: 60px;
  border-radius: 100%;
  margin-bottom: 30px;
  background-color: #fff;
  font-size: 24px;
  color: ${colorPalette.primary2Color};
  opacity: 0.8;
  transition: all 0.3s;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const SidebarIcon = styled.div`
  > svg {
    max-width: 30px;
    max-height: 30px;
    fill: ${colorPalette.primary2Color};
  }
`;

export const EditIconSet = styled.div`
  position: relative;
  left: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const BottomIcons = styled.div`
  position: relative;
  bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
`;

export const StyledReactTooltip = styled(ReactTooltip)`
  z-index: 20000 !important;
  font-size: 16px !important;
  transition: opacity 0.3s !important;
`;

export const SpecialBtn = styled.i`
  font-size: 36px;
  color: #fff;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.i`
  margin-top: 30px;
  font-size: 36px;
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
  background-color: rgba(0, 0, 0, 0.3);
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  ${media.small`
    display: none;
  `}
`;
