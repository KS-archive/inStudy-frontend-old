import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import { colorPalette } from '../../../utils/constants/styles';

export const StyledDialog = styled(Dialog)`
  padding-left: ${props => props.sidebar ? '120px' : 0};
  width: ${props => props.sidebar ? 'calc(100vw - 120px)' : '100vw'};
  line-height: 1.5;

  /* Dialog title */
  > div > div > div > h3 {
    color: ${colorPalette.primary1Color} !important;
  }
`;
