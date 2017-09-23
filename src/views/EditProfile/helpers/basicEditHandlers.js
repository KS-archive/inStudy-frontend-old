export default (comp) => {
  comp.changeSocials = (values) => {
    comp.props.changeSocials(
      values,
      () => { comp.props.addNotification('Zaktualizowano!', 'Social media zostały zaktualizowane', 'success'); comp.closeDialog(); },
      () => { comp.props.addNotification('Wystąpił błąd', 'Social media nie zostały zmienione', 'error'); },
    );
  };

  comp.changeLogo = (value) => {
    comp.props.changeLogo(
      value.image[0],
      () => { comp.props.addNotification('Zaktualizowano!', 'Logo zostało zaktualizowane', 'success'); comp.closeDialog(); comp.renderCircle(); },
      () => { comp.props.addNotification('Wystąpił błąd', 'Logo nie zostało zmienione', 'error'); },
    );
  };

  comp.changeBackground = (value) => {
    comp.props.changeBackground(
      value.image[0],
      () => { comp.props.addNotification('Zaktualizowano!', 'Zdjęcie w tle zostało zaktualizowane', 'success'); comp.closeDialog(); comp.renderCircle(); },
      () => { comp.props.addNotification('Wystąpił błąd', 'Zdjęcie w tle nie zostało zmienione', 'error'); },
    );
  };
};
