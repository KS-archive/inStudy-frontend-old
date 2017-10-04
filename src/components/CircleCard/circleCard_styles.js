import styled from 'styled-components';
import Tooltip from 'react-tooltip';
import { colorPalette, media } from '../../utils/constants/styles';

export const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  top: -30px;
  display: flex;
  width: 555px;
  height: 191px;
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  border-radius: 2px;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 30px, rgba(0, 0, 0, 0.23) 0 6px 10px;
  }

  &:nth-child(odd) {
    margin-right: 30px;
  }

  ${media.large`
    width: 435px;
  `}
  ${media.medium`
    width: 680px;
    margin-right: 0 !important;
  `}
  ${media.small`
    width: 100%;
  `}
  ${media.x_small`
    flex-direction: column;
    align-items: center;
    height: unset;
  `}
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 150px;
  ${media.large`
    min-width: 170px;
  `}
  ${media.medium`
    min-width: 270px;
  `}
  ${media.small`
    min-width: 150px;
  `}
  ${media.x_small`
    max-height: 120px;
    margin-bottom: 15px;
    min-width: 100%;
  `}
`;

export const Logo = styled.img`
  max-width: 220px;
  max-height: 150px;
  ${media.large`
    max-width: 170px;
  `}
  ${media.medium`
    max-width: 270px;
  `}
  ${media.small`
    max-width: 150px;
  `}
  ${media.x_small`
    max-height: 120px;
    max-width: 100%;
  `}
`;

export const ContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: calc(100% - 220px);
  padding-left: 20px;
  ${media.large`
    width: calc(100% - 170px);
  `}
  ${media.medium`
    width: calc(100% - 270px);
  `}
  ${media.small`
    width: calc(100% - 150px);
  `}
  ${media.x_small`
    width: 100%;
    padding-left: 0;
  `}
`;

export const Name = styled.h3`
  box-sizing: border-box;
  overflow-wrap: break-word;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  color: ${colorPalette.textColor};
  ${media.large`
    font-size: 18px;
  `}
  ${media.x_small`
    font-size: 16px;
    text-align: center;
  `}
`;

export const Category = styled.p`
  margin-top: 5px;
  font-size: 16px;
  line-height: 1.3;
  color: ${colorPalette.accent3Color};
  ${media.large`
    font-size: 14px;
  `}
  ${media.x_small`
    text-align: center;
  `}
`;

export const BottomLine = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  ${media.x_small`
    margin-top: 30px;
  `}
`;

export const UniversityLogo = styled.div`
  min-width: 140px;
  height: 40px;
  margin-right: auto;
  background: url("${props => props.background}") no-repeat;
  background-position: left center;
  background-size: contain;
  ${media.large`
    min-width: 100px;
  `}
  ${media.medium`
    min-width: 145px;
  `}
  ${media.small`
    min-width: 100px;
  `}
  ${media.x_small`
    margin-right: 0;
    min-width: 120px;
  `}
`;

export const Flag = styled.div`
  position: relative;
  right: -21px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  background-color: ${colorPalette.accent1Color};
  ${media.large`
    right: -18px;
    min-width: 110px;
    font-size: 12px;
  `}
  ${media.medium`
    right: -21px;
    min-width: 140px;
    font-size: 14px;
  `}
  ${media.small`
    min-width: 100px;
    font-size: 12px;
  `}
  ${media.x_small`
    margin-left: auto;
    min-height: 30px;
  `}
`;

export const ReactTooltip = styled(Tooltip)`
  transition: opacity 0.6s !important;
  line-height: 1.3;
  &.show { opacity: 0.4 !important; }
`;
