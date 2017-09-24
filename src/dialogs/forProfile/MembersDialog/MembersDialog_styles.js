import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import { colorPalette, media } from '../../../utils/constants/styles';

export const StyledDialog = styled(Dialog)`
  > div > div {
    width: 470px !important;
    max-width: unset !important;

    @media (max-width: 600px) {
      width: 90% !important;
      transform: translate(0, 75px) !important;
    }
  }

  > div > div > div > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px !important;
    border-radius: 2px;
    background-color: #fff;
    ${media.small`
      padding: 20px !important;
    `}

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${colorPalette.textColor};
    }
  }
`;

export const Image = styled.div`
  min-width: 200px;
  min-height: 200px;
  margin-bottom: 20px;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.src});
`;

export const Name = styled.h3`
  font-size: 30px;
  font-weight: 500;
  line-height: 1.3;
  text-align: center;
`;

export const Role = styled.p`
  display: ${props => !props.display && 'none'};
  font-size: 18px;
  line-height: 1.3;
  color: ${props => props.color};
`;

export const Line = styled.div`
  display: ${props => !props.display && 'none'};
  width: 165px;
  min-height: 2px;
  margin: 30px auto;
  background-color: ${colorPalette.accent2Color};
`;

export const Description = styled.p`
  display: ${props => !props.display && 'none'};
  font-size: 18px;
  text-align: center;
  line-height: 1.3;
  color: ${colorPalette.accent3Color};

  span:not(:last-child) {
    display: block;
    padding-bottom: 10px;
  }
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
`;

export const SocialCircle = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  min-height: 50px;
  border-radius: 100%;
  margin-right: 20px;
  font-size: 24px;
  transition: all 0.3s;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #fff !important;
  }

  i {
    color: #fff;
  }
`;
