import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Body = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  min-height: ${props => props.isNormalPath
    ? 'calc(100vh - 60px)'
    : '100vh'};
  margin-top: ${props => props.isNormalPath && '60px'};

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f5f5f5;

    @media (max-width: 700px) {
      display: none;
    }
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #757575;
  }
`;
