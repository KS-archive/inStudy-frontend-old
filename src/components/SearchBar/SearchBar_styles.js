import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import { colorPalette } from '../../utils/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  color: rgb(33, 33, 33);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);
`;

export const SearchContainer = styled.div`
  margin: auto 16px;
  width: 100%;
  font-weight: 500;
`;

export const SearchIconWrapper = styled(IconButton)`
  transform: ${props => props.nonEmpty ? 'scale(0, 0)' : 'scale(1, 1)'};
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-right: -48px !important;

  svg {
    color: ${colorPalette.accent3Color} !important;
    opacity: ${props => props.nonEmpty ? 0 : 1};
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const CloseIconWrapper = styled(IconButton)`
  transform: ${props => props.nonEmpty ? 'scale(1, 1)' : 'scale(0, 0)'};
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    color: ${colorPalette.accent3Color} !important;
    opacity: ${props => props.nonEmpty ? 1 : 0};
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
