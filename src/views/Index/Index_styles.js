import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Body = styled.div`
  overflow-x: hidden;
  min-height: ${props => props.isNormalPath
    ? 'calc(100vh - 60px)'
    : '100vh'};
  margin-top: ${props => props.isNormalPath && '60px'};
`;
