import styled from 'styled-components';
import { colorPalette } from '../../js/constants/styles';

export const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 80px;
  background-color: rgba(${colorPalette.primary1Color}, 0.05);
`;

export const SearchFiltersContainer = styled.div`
  margin-top: 20px;
`;

export const CirclesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
`;
