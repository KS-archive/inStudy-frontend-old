import styled from 'styled-components';
import { colorPalette, media } from '../../js/constants/styles';

export const Images = styled.div`
  width: 375px;
  margin-right: 40px;
  ${media.medium__large`
    width: 300px;
    margin-right: 30px;
  `}
  ${media.medium`
    margin: 0 0 40px 0;
  `}
  ${media.small`
    width: 270px;
    max-width: 90vw;
  `}
`;

export const MainImage = styled.div`
  width: 375px;
  height: 375px;
  border-radius: 2px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${props => props.src});
  ${media.medium__large`
    width: 300px;
    height: 300px;
  `}
  ${media.small`
    width: 270px;
    max-width: 90vw;
    height: 270px;
    max-height: 90vw;
  `}
`;

export const Carousel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 375px;
  height: 100px;
  margin-top: 25px;
  ${media.medium__large`
    width: 300px;
  `}
  ${media.small`
    display: none;
  `}
`;

export const Arrow = styled.div`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  i {
    font-size: 24px;
    color: ${colorPalette.accent2Color};
  }
`;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  ${media.medium__large`
    width: 260px;
  `}
`;

export const MiniImage = styled.div`
  width: 70px;
  height: 70px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.5;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const ActiveMiniImg = styled.div`
  width: 120px;
  height: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transition: all 0.3s;
  ${media.medium__large`
    width: 100px;
  `}
`;

export const TextContent = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: 95vh;
  min-width: calc(100% - 415px);
  line-height: 1.3;
  padding: 0 10px;
  ${media.large`
    min-width: calc(100% - 330px);
  `}
  ${media.medium`
    min-width: 100%;
    overflow-y: unset;
    max-height: unset;
    padding: 0;
  `}
`;

export const Name = styled.h1`
  margin-bottom: 5px;
  font-size: 36px;
  font-weight: 900;
  color: ${colorPalette.textColor};
  ${media.large`
    font-size: 30px;
  `}
  ${media.medium`
    text-align: center;
  `}
`;

export const Header = styled.h2`
  margin-bottom: 35px;
  font-size: 22px;
  color: ${colorPalette.accent3Color};
  ${media.large`
    font-size: 20px;
  `}
  ${media.medium`
    text-align: center;
  `}
`;

export const Description = styled.div`
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 40px;
  ${media.medium`
    text-align: center;
  `}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    color: ${colorPalette.textColor};
  }

  ol { list-style: decimal; }
  ul { list-style: disc; }

  a {
    color: $primary-color !important;
    text-decoration: underline !important;
  }

  strong { font-weight: 500; }
  h1 { font-size: 48px; }
  h2 { font-size: 36px; }
  h3 { font-size: 30px; }
  h4 { font-size: 24px; }
  h5 { font-size: 20px; }

  h6 {
    font-size: 16px;
    text-transform: uppercase;
  }

  p,
  ol,
  ul {
    font-size: 16px;
    color: ${colorPalette.accent3Color};
    margin-bottom: 10px;
    ${media.small`
      font-size: 18px;
    `}
  }
`;

export const Socials = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 40px;
  padding-top: 40px;
  ${media.medium`
    align-items: flex-start;
    justify-content: center;
    min-height: 80px;
    padding: 0;
  `}
`;

export const SocialCircle = styled.a`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin-left: 20px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  transition: all 0.6s;
  ${media.medium`
    margin-left: 0;
  `}

  &:hover {
    cursor: pointer;
    background-color: #fff !important;
  }
`;
