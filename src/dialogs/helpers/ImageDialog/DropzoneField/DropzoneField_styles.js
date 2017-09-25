import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { colorPalette, media } from '../../../../utils/constants/styles';

export const StyledDropzone = styled(Dropzone)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 300px;
  border: ${props => props.preview
    ? `1px dashed ${colorPalette.accent2Color}`
    : `2px dashed ${colorPalette.accent2Color}`};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  transition: all 0.3s;

  > div:first-of-type {
    opacity: ${props => props.preview ? 0.5 : 'inherit'};
  }

  &:hover {
    cursor: pointer;

    > div:first-of-type {
      background-color: ${colorPalette.accent3Color};
      opacity: ${props => props.preview ? 1 : 'inherit'};
    }
  }

  ${media.medium`
    width: 450px;
  `}
`;

export const Text = styled.div`
  border-radius: 2px;
  padding: 10px;
  background-color: ${colorPalette.accent3Color};
  color: #fff;
  transition: all 0.3s;
`;

export const ImageError = styled.div`
  margin-top: 10px;
  text-align: center;
  color: red;
`;
