import Recruitment from 'material-ui/svg-icons/social/notifications-active';
import OpenProjects from 'material-ui/svg-icons/social/people';

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
