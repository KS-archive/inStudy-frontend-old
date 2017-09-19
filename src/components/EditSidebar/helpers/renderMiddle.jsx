import React from 'react';
import renderModuleIcon from './renderModuleIcon';
import accesibleModules from '../../../js/constants/accesibleModules';
import { Modules, IconWrapper, SidebarIcon, Icon, EditIconSet, ShadowTop, ShadowBottom } from '../EditSidebar_styles';

export default (mode, comp) => {
  const { submit, cancel, remove, changeColors } = comp.props.modalFunctions;
  const attrs = {
    onUpdate: comp.handleScroll,
  };

  switch (mode) {
    case 'Moduły':
      return (
        <Modules {...attrs}>
          {comp.state.shadows.top && <ShadowTop />}
          {comp.props.modules.map(module => renderModuleIcon(module, comp))}
          {comp.state.shadows.bottom && <ShadowBottom />}
        </Modules>
      );

    case 'Dodaj moduł':
      return (
        <Modules {...attrs}>
          {comp.state.shadows.top && <ShadowTop />}
          {accesibleModules.map(module => renderModuleIcon(module, comp))}
          {comp.state.shadows.bottom && <ShadowBottom />}
        </Modules>
      );
    case 'Edycja modułu':
      return (
        <Modules {...attrs}>
          <IconWrapper>
            <SidebarIcon>
              <comp.props.editingModule />
            </SidebarIcon>
          </IconWrapper>
          <EditIconSet>
            <Icon className="fa fa-check" aria-hidden="true" onClick={submit} />
            <Icon className="fa fa-ban" aria-hidden="true" onClick={cancel} />
            <Icon className="fa fa-trash-o" aria-hidden="true" onClick={remove} />
          </EditIconSet>
          <EditIconSet>
            {changeColors &&
              <Icon className="fa fa-paint-brush" aria-hidden="true" onClick={changeColors} />
            }
          </EditIconSet>
        </Modules>
      );
    case 'Dodawanie modułu':
      return (
        <Modules {...attrs}>
          <IconWrapper>
            <SidebarIcon>
              <comp.props.editingModule />
            </SidebarIcon>
          </IconWrapper>
          <EditIconSet>
            <Icon className="fa fa-check" aria-hidden="true" onClick={submit} />
            <Icon className="fa fa-ban" aria-hidden="true" onClick={cancel} />
          </EditIconSet>
          <EditIconSet>
            {changeColors &&
              <Icon className="fa fa-paint-brush" aria-hidden="true" onClick={changeColors} />
            }
          </EditIconSet>
        </Modules>
      );
    default: return null;
  }
};
