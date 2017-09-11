import styled from 'styled-components';
import { media } from '../../js/constants/styles';

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 265px;
  height: 265px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.backgroundImage});
  filter: ${props => props.grayScale && 'grayscale(1)'};
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    filter: grayscale(0);
  }

  ${media.xx_large`
    margin-right: 25px;
    margin-bottom: 25px;

    &:nth-child(4n),
    &:last-child { margin-right: 0 }
  `}
  ${media.large__x_large`
    margin-right: 25px;
    margin-bottom: 25px;

    &:nth-child(4n),
    &:last-child { margin-right: 0 }
  `}
  ${media.medium__large`
    width: 273px;
    height: 273px;
    margin-right: 40px;
    margin-bottom: 40px;

    &:nth-child(3n),
    &:last-child { margin-right: 0 }
  `}
  ${media.small__medium`
    width: 310px;
    height: 310px;
    margin-right: 40px;
    margin-bottom: 40px;

    &:nth-child(2n) { margin-right: 0 }
  `}
  ${media.small`
    width: 300px;
    height: 300px;
    margin-bottom: 40px;
  `}
`;

export const DataContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 93%);
`;

export const Name = styled.h3`
  margin-bottom: 5px;
  font-size: 24px;
  color: #fff;
  font-weight: 500;
  line-height: 1.3;
`;

export const Role = styled.p`
  color: #fff;
  opacity: 0;
  font-size: 0;
  transition: font-size 0.2s ease, opacity 0.2s ease 0.2s;
  ${Container}:hover & {
    font-size: 16px;
    opacity: 1;
  }
`;

export const Socials = styled.div`
  position: absolute;
  right: -130px;
  top: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 15px;
  border-radius: 10px 0 0 10px;
  font-size: 24px;
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
  ${Container}:hover & {
    right: 0;
  }
`;

export const Social = styled.a`
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
`;
