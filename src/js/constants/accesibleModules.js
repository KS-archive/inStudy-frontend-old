import SimpleTextIcon from '../../icons/module_icons/Signs';
import ProjectsTilesIcon from '../../icons/module_icons/TilesView';
import IconTextIcon from '../../icons/module_icons/ThreeColumnsLayout';
import NumbersIcon from '../../icons/module_icons/Mathematics';
import CollapsibleIcon from '../../icons/module_icons/SixRowsLayoutInterfaceSymbol';
import MembersTilesIcon from '../../icons/module_icons/Business';
import LinkImagesIcon from '../../icons/module_icons/File';

export default [
  {
    kind: 'SimpleText',
    name: 'Tekst (markdown)',
    icon: SimpleTextIcon,
  },
  {
    kind: 'ProjectsTiles',
    name: 'Kafelki projektowe',
    icon: ProjectsTilesIcon,
  },
  {
    kind: 'IconText',
    name: 'Kolumny tekstowe',
    icon: IconTextIcon,
  },
  {
    kind: 'Numbers',
    name: 'Liczby',
    icon: NumbersIcon,
  },
  {
    kind: 'Collapsible',
    name: 'Lista rozwijana',
    icon: CollapsibleIcon,
  },
  {
    kind: 'MembersTiles',
    name: 'Kafelki osobowe',
    icon: MembersTilesIcon,
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
