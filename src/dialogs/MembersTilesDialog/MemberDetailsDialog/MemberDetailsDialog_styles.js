import styled from 'styled-components';
import { colorPalette, media } from '../../../js/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;

export const MediaWrapper = styled.div`
  display: flex;
  min-height: 130px;
`;

export const MediaElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 130px;

  &:first-of-type {
    width: 100px;
    margin-right: 100px;
  }
`;

export const LabelHeader = styled.div`
  margin: 20px 0 15px;
  font-size: 14px;
  font-weight: 500;
  color: ${colorPalette.primary1Color};
`;

export const ImagePreview = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  min-height: 100px;
  margin-right: 30px;
  border: ${props => props.preview ? 'none' : `1px solid ${colorPalette.accent2Color}`};
  transition: all 0.3s;

  > img {
    max-width: 100px;
    max-height: 100px;
  }

  &:hover {
    cursor: pointer;

    > div {
      opacity: 0.8;
    }
  }
`;

export const ImagePreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colorPalette.textColor};
  opacity: 0;
  transition: all 0.3s;

  > i {
    font-size: 24px;
    color: #fff;
  }
`;

export const AddSocial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  border: 1px solid  ${colorPalette.accent3Color};
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    border: 1px solid  ${colorPalette.accent1Color};
    color: ${colorPalette.accent1Color};
  }
`;
