import styled from 'styled-components';
import { colorPalette, media } from '../../../js/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 200px;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;

export const ImagePreview = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  min-height: 200px;
  margin-right: 30px;
  border: ${props => props.preview ? 'none' : `1px solid ${colorPalette.accent2Color}`};

  > img {
    max-width: 200px;
    max-height: 200px;
  }
`;

export const Editfields = styled.div`
  position: relative;
  top: -5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 200px;
  width: calc(100% - 230px);
`;
