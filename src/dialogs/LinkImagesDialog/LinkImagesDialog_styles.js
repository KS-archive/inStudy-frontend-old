import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';
import { colorPalette, media } from '../../js/constants/styles';

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

export const Elements = styled.div`
  width: 100%;
`;
