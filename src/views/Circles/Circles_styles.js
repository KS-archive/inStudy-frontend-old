import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import { media } from '../../utils/constants/styles';

export const ContentWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 80px;
  background-color: rgba(63, 81, 181, 0.05);
  ${media.small`
    padding-top: 30px;
  `}
`;

export const SearchFiltersContainer = styled.div`
  margin-top: 20px;
`;

export const CirclesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 60px;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  margin-top: -20px;
`;
