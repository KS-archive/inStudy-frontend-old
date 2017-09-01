import styled from 'styled-components';
import Tooltip from 'react-tooltip';
import { colorPalette, media } from '../../js/constants';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 262px;
  height: 350px;
  margin-right: 30px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  border-radius: 2px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 30px, rgba(0, 0, 0, 0.23) 0 6px 10px;
  }

  ${media.x_large`
    &:nth-child(4n) {
      margin-right: 0;
    }
  `}
  ${media.medium__large`
    margin-right: 57px;

    &:nth-child(3n) {
      margin-right: 0;
    }
  `}
  ${media.small__medium`
    width: 300px;
    height: 400px;
    margin-right: 80px;

    &:nth-child(2n) {
      margin-right: 0;
    }
  `}
  ${media.small`
    box-sizing: content-box !important;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    margin: 0 auto 30px;
    width: 300px;
    height: 450px;
  `}
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100%;
  ${media.small`
    height: 200px;
  `}
`;

export const Logo = styled.img`
  max-width: 100%;
  max-height: 150px;
  ${media.small`
    max-height: 200px;
  `}
`;

export const Name = styled.h3`
  overflow-wrap: break-word;
  max-width: 100%;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
  color: ${colorPalette.textColor};
  ${media.medium`
    font-size: 22px;
  `}
  ${media.small`
    margin-top: 30px;
    font-size: 24px;
  `}
`;

export const Category = styled.p`
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  line-height: 1.3;
  color: ${colorPalette.accent3Color};
  ${media.medium`
    font-size: 16px;
  `}
  ${media.small`
    font-size: 18px;
  `}
`;

export const BottomLine = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  ${media.medium`
    height: 40px;
  `}
  ${media.small`
    height: 50px;
  `}
`;

export const UniversityLogo = styled.img`
  max-width: 50px;
  max-height: 30px;
  ${media.medium`
    max-width: 60px;
    max-height: 40px;
  `}
  ${media.small`
    max-width: 70px;
    max-height: 45px;
  `}
`;

export const InfoIcons = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  margin-right: 10px;
  background-color: ${colorPalette.primary1Color};
  ${media.medium`
    width: 40px;
    height: 40px;
  `}
  ${media.small`
    width: 45px;
    height: 45px;
  `}
`;

export const TypeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${colorPalette.accent1Color};
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  ${media.medium`
    width: 40px;
    height: 40px;
    font-size: 20px;
  `}
  ${media.small`
    width: 45px;
    height: 45px;
    font-size: 24px;
  `}
`;

export const ReactTooltip = styled(Tooltip)`
  transition: opacity 0.6s !important;
  line-height: 1.3;
  &.show { opacity: 0.4 !important; }

  ${media.medium`
    font-size: 18px !important;
  `}
  ${media.small`
    font-size: 20px !important;
  `}
`;
