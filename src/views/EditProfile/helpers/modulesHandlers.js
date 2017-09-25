export default (comp) => {
  comp.submitModule = (values) => {
    const { addNotification } = comp.props;
    const updateError = () => { addNotification('Wystąpił błąd', 'Moduł nie został zaktualizowany', 'error'); };
    const addError = () => { addNotification('Wystąpił błąd', 'Moduł nie został dodany', 'error'); };
    const updateSuccess = () => { addNotification('Zaktualizowano!', 'Moduł został zaktualizowany', 'success'); comp.closeDialog(); };
    const addSuccess = () => { addNotification('Dodano!', 'Moduł został dodany', 'success'); comp.closeDialog(); };

    if (values.id && typeof values.id === 'string') {
      comp.props.updateModule(values, updateSuccess, updateError);
    } else {
      comp.props.addModule(values, addSuccess, addError);
    }
  };

  comp.deleteModule = (id) => {
    comp.props.deleteModule(
      id,
      () => { comp.props.addNotification('Usunięto!', 'Moduł został usunięty', 'success'); },
      () => { comp.props.addNotification('Wystąpił błąd', 'Błąd podczas usuwania modułu', 'error'); },
    );
  };

  comp.reorderModules = (values) => {
    comp.props.reorderModules(
      values,
      () => { comp.props.addNotification('Zaktualizowano!', 'Kolejność modółów została zmieniona', 'success'); comp.closeDialog(); },
      () => { comp.props.addNotification('Wystąpił błąd', 'Kolejność modółów nie została zmieniona', 'error'); },
    );
  };
};
