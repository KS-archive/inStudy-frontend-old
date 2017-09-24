import styled from 'styled-components';
import { media } from '../../../utils/constants/styles';

export const Form = styled.div`
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
