import React from 'react';
import accessibleModules from '../../../utils/constants/accesibleModules';
import { getCookie } from '../../../utils/cookies';
import { Wrapper } from '../EditProfile_styles';

export default (comp) => {
  comp.renderCircle = () => {
    if (getCookie('token')) {
      comp.props.getActiveCircle(() => {
        comp.props.addNotification('Wylogowano', 'Zostałeś wylogowany ze względu na długi brak aktywności na koncie', 'info');
        comp.logout();
      });
    } else {
      comp.props.addNotification('Wystąpił błąd', 'Nie udało nam się odnaleźć Twojego konta. Spróbuj zalogować się ponownie', 'error');
      comp.logout();
    }
  };

  comp.renderModule = (module, colors) => {
    const ModuleComponent = accessibleModules.find(el => el.kind === module.kind).component;
    return (
      <Wrapper key={module.id}>
        <ModuleComponent {...module} mainColors={colors} />
      </Wrapper>
    );
  };

  comp.renderModuleDialog = (dialog, data) => {
    let DialogComponent = accessibleModules.find(el => el.kind === dialog);
    if (DialogComponent) {
      DialogComponent = DialogComponent.dialog;
      return <DialogComponent kind={dialog} {...data} />;
    }
    return null;
  };
};
