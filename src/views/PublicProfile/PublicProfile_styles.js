import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

export const Wrapper = styled.div`
  margin: 120px auto;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  position: relative;
  top: 50px;
  left: calc(50% - 40px);
`;
