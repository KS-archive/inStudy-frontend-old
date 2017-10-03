import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import { media } from '../../../utils/constants/styles';

export const StyledTextField = styled(TextField)`
  width: 400px !important;
  ${media.xx_large`
    width: 500px !important;
  `}
  ${media.large`
    width: 310px !important;
  `}
  ${media.medium`
    width: 420px !important;
  `}
`;

export const StyledSelectField = styled(SelectField)`
  width: 400px !important;
  ${media.xx_large`
    width: 500px !important;
  `}
  ${media.large`
    width: 310px !important;
  `}
  ${media.medium`
    width: 420px !important;
  `}
`;

export const StyledCheckbox = styled(Checkbox)`
  width: 100% !important;
  margin-top: 20px;
`;

export const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 26px;
  ${media.medium`
    justify-content: center;
    padding: 0 !important;
  `}
`;
