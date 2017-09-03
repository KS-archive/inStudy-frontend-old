import styled from 'styled-components';
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
  padding-left: ${props => props.isSidebar ? '150px' : 0};
  width: ${props => props.isSidebar ? 'calc(100vw - 150px)' : '100vw'};

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
      width: 90% !important;
    `}
  }

  /* Dialog title */
  > div > div > div > h3 {
    padding: 30px 50px 10px !important;
    font-weight: 500 !important;
    color: ${colorPalette.primary1Color} !important;
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

    button span {
      font-size: 16px !important;
    }

    /* Dialog cancel button */
    button:first-of-type {
      margin-right: 15px !important;
    }
  }
`;
