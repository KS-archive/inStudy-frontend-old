import styled from 'styled-components';
import Field from 'redux-form/lib/Field';
import { media } from '../../js/constants/styles';

export const StyledField = styled(Field)`
  width: 400px !important;
  ${media.large`
    width: 310px !important;
  `}
  ${media.medium`
    width: 420px !important;
  `}
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
  `}
`;
