import styled from 'styled-components';
import { media } from '../../js/constants/styles';

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 360px;
  height: 360px;
  border-radius: 2px;
  margin-bottom: 30px;
  margin-right: 30px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${props => props.backgroundImage});
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0 10px 30px, rgba(0, 0, 0, 0.23) 0 6px 10px;
  }

  @media (min-width: 1201px) {
    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  ${media.medium__large`
    width: 420px;
    height: 420px;
    margin-bottom: 50px;
    margin-right: 60px;

    &:nth-child(2n) {
      margin-right: 0;
    }
  `}
  ${media.medium`
    width: 420px;
    height: 420px;
    margin: 0 auto 30px;
  `}

  @media (max-width: 490px) {
    max-width: 300px;
    max-height: 300px;
  }
`;

export const Name = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  ${media.medium`
    font-size: 22px;
  `}

  @media (max-width: 490px) {
    font-size: 18px;
  }
`;

export const Labels = styled.div`
  position: absolute;
  top: 0;
  right: -2px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding: 8px 40px;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 3px 10px, rgba(0, 0, 0, 0.23) 0 3px 10px;
  background-color: ${props => props.backgroundColor};
  font-weight: 500;
  text-align: center;
  color: #fff;
  ${media.medium`
    font-size: 18px;
  `}

  @media (max-width: 490px) {
    font-size: 16px;
    padding: 5px 30px;
  }
`;
