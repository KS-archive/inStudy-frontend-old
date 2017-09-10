import styled from 'styled-components';
import { media } from '../../js/constants/styles';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${media.medium`
    justify-content: space-around;
  `}
`;

export const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  color: ${props => props.color};

  &:hover {
    cursor: pointer;
  }

  i {
    position: relative;
    top: -2px;
    margin-left: 5px;
  }
`;
