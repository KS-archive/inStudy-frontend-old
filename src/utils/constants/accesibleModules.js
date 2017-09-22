import SimpleText from '../../modules/SimpleText/SimpleText';
import ProjectsTiles from '../../modules/ProjectsTiles/ProjectsTiles';
import IconText from '../../modules/IconText/IconText';
import Numbers from '../../modules/Numbers/Numbers';
import Collapsible from '../../modules/Collapsible/Collapsible';
import LinkImages from '../../modules/LinkImages/LinkImages';
import MembersTiles from '../../modules/MembersTiles/MembersTiles';
import SimpleTextIcon from '../../icons/module_icons/Signs';
import ProjectsTilesIcon from '../../icons/module_icons/TilesView';
import IconTextIcon from '../../icons/module_icons/ThreeColumnsLayout';
import NumbersIcon from '../../icons/module_icons/Mathematics';
import CollapsibleIcon from '../../icons/module_icons/SixRowsLayoutInterfaceSymbol';
import MembersTilesIcon from '../../icons/module_icons/Business';
import LinkImagesIcon from '../../icons/module_icons/File';
import SimpleTextDialog from '../../dialogs/SimpleTextDialog/SimpleTextDialog';
import LinkImagesDialog from '../../dialogs/LinkImagesDialog/LinkImagesDialog';
import NumbersDialog from '../../dialogs/NumbersDialog/NumbersDialog';
import IconTextDialog from '../../dialogs/IconTextDialog/IconTextDialog';
import CollapsibleDialog from '../../dialogs/CollapsibleDialog/CollapsibleDialog';
import MembersTilesDialog from '../../dialogs/MembersTilesDialog/MembersTilesDialog';
import ProjectsTilesDialog from '../../dialogs/ProjectsTilesDialog/ProjectsTilesDialog';

export default [
  {
    kind: 'SimpleText',
    name: 'Tekst (markdown)',
    icon: SimpleTextIcon,
    component: SimpleText,
    dialog: SimpleTextDialog,
  },
  {
    kind: 'ProjectsTiles',
    name: 'Kafelki projektowe',
    icon: ProjectsTilesIcon,
    component: ProjectsTiles,
    dialog: ProjectsTilesDialog,
    types: [
      {
        name: 'Kwadraty',
        icon: 'project-tiles-1.png',
      },
      {
        name: 'Wydarzenia z fb',
        icon: 'project-tiles-2.png',
      },
    ],
  },
  {
    kind: 'IconText',
    name: 'Kolumny tekstowe',
    icon: IconTextIcon,
    component: IconText,
    dialog: IconTextDialog,
  },
  {
    kind: 'Numbers',
    name: 'Liczby',
    icon: NumbersIcon,
    component: Numbers,
    dialog: NumbersDialog,
  },
  {
    kind: 'Collapsible',
    name: 'Lista rozwijana',
    icon: CollapsibleIcon,
    component: Collapsible,
    dialog: CollapsibleDialog,
  },
  {
    kind: 'MembersTiles',
    name: 'Kafelki osobowe',
    icon: MembersTilesIcon,
    component: MembersTiles,
    dialog: MembersTilesDialog,
    types: [
      {
        name: 'Kwadratowe kafelki',
        icon: 'member-tiles-1.png',
      },
      {
        name: 'Układ kolumnowy',
        icon: 'member-tiles-2.png',
      },
      {
        name: 'Karty',
        icon: 'member-tiles-3.png',
      },
    ],
  },
  {
    kind: 'LinkImages',
    name: 'Galeria z linkami',
    icon: LinkImagesIcon,
    component: LinkImages,
    dialog: LinkImagesDialog,
    types: [
      {
        name: 'Klasyczna galeria',
        icon: 'gallery-normal.png',
      },
      {
        name: 'Obramowane ikony',
        icon: 'gallery-bordered.png',
      },
    ],
  },
];
