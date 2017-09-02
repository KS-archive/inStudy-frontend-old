import styled from 'styled-components';
import IconMenuStyles from 'material-ui/IconMenu';
import { colorPalette } from '../../js/constants/styles';

export const Header = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 60px;
  background-color: ${props => props.transparent
    ? 'rgba(0, 0, 0, 0)'
    : colorPalette.primary2Color};
  box-shadow: ${props => props.transparent
    ? 'none'
    : '0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.27)'};
  margin-top: ${props => props.transparent && '30px'};

  @media (max-width: 500px) {
    padding: 0 30px;
  }
`;

export const AppLogo = styled.img`
  height: 30px;
  &:hover { cursor: pointer; }
`;

export const LoggedUser = styled.div`
  overflow: hidden;
  width: 40px;
  height: 40px;
  margin-left: auto;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const UserLogo = styled.img`
  max-width: 30px;
  max-height: 30px;
`;

export const IconMenu = styled(IconMenuStyles)`
  margin-left: auto;
`;
