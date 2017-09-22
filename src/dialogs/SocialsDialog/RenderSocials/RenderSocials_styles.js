import styled from 'styled-components';
import Field from 'redux-form/lib/Field';
import { colorPalette, media } from '../../../utils/constants/styles';

export const StyledField = styled(Field)`
  width: 400px !important;
  ${media.large`
    width: 310px !important;
  `}
  ${media.medium`
    width: 190px !important;
  `}
`;

export const SocialFields = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const DeleteSocial = styled.div`
  margin-top: 15px;
  color: ${colorPalette.accent3Color};
  opacity: 0.7;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const AddSocialFields = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-top: 30px;
  border: 1px solid  ${colorPalette.accent3Color};
  color: ${colorPalette.accent3Color};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    border: 1px solid  ${colorPalette.accent1Color};
    color: ${colorPalette.accent1Color};
  }
`;
