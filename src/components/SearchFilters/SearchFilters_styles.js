import styled from 'styled-components';
import { colorPalette } from '../../js/constants/styles';

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.6s ease-in-out 0.1s;
`;

export const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

export const FilterLabel = styled.p`
  display: flex;
  align-items: center;
  margin-top: 20px;
  transition: all 0.3s;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    color: $primary-color;
    text-decoration: underline;
  }
`;

export const RemoveFilters = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  width: 256px;
  height: 63px;
  padding-bottom: 5px;
  margin: 0 20px;
  color: ${props => props.anyActive
    ? colorPalette.textColor
    : '#bbb'};
  border-bottom: ${props => props.anyActive
    ? `2px solid ${colorPalette.primary1Color}`
    : '1px solid #e0e0e0'};

  &:hover {
    cursor: ${props => props.anyActive
    ? 'pointer'
    : 'default'};
  }
`;
