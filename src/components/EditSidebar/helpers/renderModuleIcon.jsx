import React from 'react';
import { getRandomInt } from '../../../utils/utils';
import accesibleModules from '../../../utils/constants/accesibleModules';
import { IconWrapper, SidebarIcon, StyledReactTooltip } from '../EditSidebar_styles';

export default (module, comp) => {
  const key = Date.now() + getRandomInt(1000, 9999);
  const IconComponent = (module.icon)
    ? module.icon // Add new module
    : accesibleModules.filter(m => (m.kind === module.kind))[0].icon; // Edit existing module
  const moduleData = (module.icon) ? {} : module;
  const handleClick = () => {
    comp.props.openDialog(module.kind, moduleData);
    comp.props.changeContent({ mode: (module.icon) ? 'Dodawanie modułu' : 'Edycja modułu', editingModule: IconComponent });
  };
  const dataTip = (module.icon) ? module.name : module.title;
  return (
    <IconWrapper key={key} data-tip={dataTip} onClick={handleClick}>
      <SidebarIcon>
        <IconComponent />
      </SidebarIcon>
      <StyledReactTooltip place="right" effect="solid" />
    </IconWrapper>
  );
};
