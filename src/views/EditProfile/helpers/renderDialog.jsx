import React from 'react';
import CardEditDialog from '../../../dialogs/editing/CardEditDialog/CardEditDialog';
import SocialsDialog from '../../../dialogs/helpers/SocialsDialog/SocialsDialog';
import ImageDialog from '../../../dialogs/helpers/ImageDialog/ImageDialog';
import ReorderDialog from '../../../dialogs/helpers/ReorderDialog/ReorderDialog';

export default (comp, moduleData) => {
  switch (comp.state.dialog) {
    case 'card':
      return (
        <CardEditDialog
          renderCircle={comp.renderCircle}
          {...comp.state.dialogData}
          {...moduleData}
        />
      );
    case 'socials':
      return (
        <SocialsDialog
          submitFunction={comp.changeSocials}
          {...moduleData}
        />
      );
    case 'logo':
      return (
        <ImageDialog
          submitFunction={comp.changeLogo}
          width={310}
          height={310}
          maxSize={200000}
          title="Edytuj logo"
          {...moduleData}
        />
      );
    case 'background':
      return (
        <ImageDialog
          submitFunction={comp.changeBackground}
          width={1920}
          height={600}
          maxSize={400000}
          title="Edytuj zdjęcie w tle"
          {...moduleData}
        />
      );
    case 'reorder':
      return (
        <ReorderDialog
          submitFunction={comp.reorderModules}
          closeDialog={comp.closeDialog}
          title="Zmień kolejność modułów"
          data={comp.state.modules}
          displayBy="title"
          sidebar
        />
      );
    default: return null;
  }
};
