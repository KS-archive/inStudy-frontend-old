import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { colorPalette, media } from './constants/styles';

// MAIN WRAPPER FOR CONTENT.
export const MainContainer = styled.div`
  z-index: -2;
  width: 1140px;
  margin: 0 auto;
  ${media.large`
    width: 900px;
  `}
  ${media.medium`
    width: 680px;
  `}
  ${media.small`
    width: 90%;
  `}
`;

// HEADER OF MODULE.
export const SectionHeader = styled.h1`
  margin: 0 auto 50px;
  font-size: 32px;
  font-weight: 900;
  line-height: 1.3;
  text-align: center;
  color: ${colorPalette.textColor};
`;

// MODAL IN PROFILE VIEW.
export const BasicDialog = styled(Dialog)`
  > div > div {
    width: 1140px !important;
    max-width: unset !important;
    ${media.large`
      width: 900px !important;
    `}
    ${media.medium`
      width: 680px !important;
    `}
    ${media.small`
      width: 95% !important;
    `}
  }

  > div > div > div > div:first-of-type {
    box-sizing: border-box;
    display: flex;
    padding: 50px !important;
    ${media.medium`
      flex-direction: column;
      align-items: center;
    `}
    ${media.small`
      padding: 20px !important;
    `}

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: ${colorPalette.textColor};
    }
  }
`;

// MODAL IN EDITPROFILE VIEW.
/* Website overlay */
export const EditDialog = styled(Dialog)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0 !important;
  padding-bottom: 90px !important;
  padding-left: ${props => props.isSidebar ? '120px' : 0};
  width: ${props => props.isSidebar ? 'calc(100vw - 120px)' : '100vw'};

  /* Dialog body */
  > div > div {
    width: 1200px !important;
    max-width: unset !important;
    ${media.x_large`
      width: 990px !important;
    `}
    ${media.large`
      width: 800px !important;
    `}
    ${media.medium`
      width: 530px !important;
    `}
    ${media.small`
      display: none !important;
    `}
  }

  /* Dialog title */
  > div > div > div > h3 {
    padding: 30px 50px 15px !important;
    font-weight: 500 !important;
    color: ${colorPalette.primary1Color} !important;
    ${media.medium`
      padding: 30px 24px 10px !important;
    `}
  }

  /* Dialog content */
  > div > div > div > div:first-of-type {
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end;
    border: none !important;

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: ${colorPalette.textColor};
    }
  }

  /* Dialog buttons container */
  > div > div > div > div:last-of-type {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 90px;
    padding: 0 50px !important;
    ${media.medium`
      padding: 0 24px !important;
    `}

    button span {
      font-size: 16px !important;
    }

    /* Dialog cancel button */
    button:first-of-type {
      margin-right: 15px !important;
    }
  }
`;

// LABEL OF FIELDS WHICH ARE NOT INPUT FIELDS.
export const LabelHeader = styled.div`
  margin: 20px 0 15px;
  font-size: 14px;
  font-weight: 500;
  color: ${colorPalette.primary1Color};
`;

// RAISED BUTTON FOR FORMS
export const StyledRaisedButton = styled(RaisedButton)`
  > button > div > div:hover {
    background-color: inherit !important;
  }

  > button > div > div > span {
    font-size: 16px !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
`;

/** ********************************
  IMAGES IN SETTINGS
********************************* */

export const Image = styled.div`
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

export const ImageOverlay = styled.div`
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

export const ImageOptions = styled.div`
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
