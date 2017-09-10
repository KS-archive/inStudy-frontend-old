import styled from 'styled-components';
import { colorPalette, media } from '../../../js/constants/styles';

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

export const MediaWrapper = styled.div`
  display: flex;
  min-height: 130px;
`;

export const MediaElement = styled.div`
  &:first-of-type {
    min-width: 170px;
    margin-right: 30px;
  }

  &:last-of-type {
    min-width: calc(100% - 200px);
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
  width: 100px;
  height: 100px;
  margin-right: 30px;
  border: ${props => props.preview ? 'none' : `1px solid ${colorPalette.accent2Color}`};
  font-size: 24px;
  transition: all 0.3s;

  > img {
    max-width: 100px;
    max-height: 100px;
  }

  &:hover {
    cursor: pointer;
    color: ${colorPalette.textColor};
    border: ${props => props.preview ? 'none' : `1px solid ${colorPalette.textColor}`};

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

export const SocialsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  min-height: 100px;
`;

export const Social = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: 1px solid  ${colorPalette.accent3Color};
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  > i {
    color: inherit;
    transition: all 0.3s;
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
    border: 1px solid  ${colorPalette.textColor};
    color: ${colorPalette.textColor};
  }
`;

export const GalleryWrapper = styled.div`
  float: left;
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
  margin: 26px 10px 0;
  border: 1px solid ${colorPalette.accent2Color};
  font-size: 24px;
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  > img {
    max-width: 90px;
    max-height: 90px;
  }

  &:hover {
    cursor: pointer;
    color: ${colorPalette.textColor};
    border: 1px solid ${colorPalette.textColor};

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
