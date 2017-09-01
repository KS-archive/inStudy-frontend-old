import Recruitment from 'material-ui/svg-icons/social/notifications-active';
import OpenProjects from 'material-ui/svg-icons/social/people';
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
  x_large: (...args) => css`
    @media (min-width: 1201px) {
      ${css(...args)}
    }
  `,
};

export const InitiativeTypes = {
  1: {
    type: 'Koło Naukowe',
    icon: 'K',
  },
  2: {
    type: 'Organizacja',
    icon: 'O',
  },
  3: {
    type: 'Fundacja',
    icon: 'F',
  },
  4: {
    type: 'Stowarzyszenie',
    icon: 'S',
  },
  5: {
    type: 'Inny',
    icon: 'I',
  },
};

export const CircleFlags = {
  recruitment: Recruitment,
  open_projects: OpenProjects,
};
