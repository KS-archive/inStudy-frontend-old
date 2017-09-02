import { css } from 'styled-components';

export const colorPalette = {
  primary1Color: '#3F51B5',
  primary2Color: '#303F9F',
  primary3Color: '#C5CAE9',
  accent1Color: '#4CAF50',
  accent2Color: '#BDBDBD',
  accent3Color: '#757575',
  textColor: '#212121',
  pickerHeaderColor: '#3F51B5',
};

export const media = {
  x_small: (...args) => css`
    @media (max-width: 540px) {
      ${css(...args)}
    }
  `,
  x_small__small: (...args) => css`
    @media (min-width: 541px) and (max-width: 700px) {
      ${css(...args)}
    }
  `,
  small: (...args) => css`
    @media (max-width: 700px) {
      ${css(...args)}
    }
  `,
  small__medium: (...args) => css`
    @media (min-width: 701px) and (max-width: 960px) {
      ${css(...args)}
    }
  `,
  medium: (...args) => css`
    @media (max-width: 960px) {
      ${css(...args)}
    }
  `,
  medium__large: (...args) => css`
    @media (min-width: 961px) and (max-width: 1200px) {
      ${css(...args)}
    }
  `,
  large: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)}
    }
  `,
  large__x_large: (...args) => css`
    @media (min-width: 1201px) and (max-width: 1600px) {
      ${css(...args)}
    }
  `,
  x_large: (...args) => css`
    @media (max-width: 1600px) {
      ${css(...args)}
    }
  `,
  xx_large: (...args) => css`
    @media (min-width: 1601px) {
      ${css(...args)}
    }
  `,
};
