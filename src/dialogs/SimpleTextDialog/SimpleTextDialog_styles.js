import styled from 'styled-components';
import Field from 'redux-form/lib/Field';
import { media } from '../../js/constants/styles';

export const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 26px;
  ${media.medium`
    padding: 0 !important;
  `}
`;

export const StyledField = styled(Field)`
  width: 100% !important;
`;
