import React, { Component } from 'react';
import valuesConfig from './valuesConfig';
import ColorsDialog from '../../../dialogs/helpers/ColorsDialog/ColorsDialog';
import RemovingConfirm from '../../../dialogs/helpers/RemovingConfirm/RemovingConfirm';
import DiscardChangesConfirm from '../../../dialogs/helpers/DiscardChangesConfirm/DiscardChangesConfirm';
import { initializeDialog } from '../../../utils/modulesHelpers';
import { renderTextField } from '../../../utils/renderHelpers';
import { Form, LabelHeader } from './VideoDialog_styles';
import { EditDialog } from '../../../utils/globalStyles';

export default class VideoDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'SimpleText', valuesConfig, ['colors']);
  }

  render() {
    const { props: { open, sidebar, colors }, state: { dialog, dialogData } } = this;
    const multilineAttrs = {
      multiLine: true,
      rows: 2,
    };

    return (
      <EditDialog
        open={open}
        isSidebar={sidebar}
        {...this.dialogArrts}
      >
        <Form>
          {renderTextField(this, 'Nazwa modułu', 'title')}
          {renderTextField(this, 'Treść', 'content', true, multilineAttrs)}
          {renderTextField(this, 'Adres URL', 'url')}
          <LabelHeader>Przycisk na dole</LabelHeader>
          {renderTextField(this, 'Nazwa przycisku', 'buttonLabel')}
          {renderTextField(this, 'Link dla przycisku', 'buttonLink')}
        </Form>
        {dialog === 'remove' &&
          <RemovingConfirm
            closeDialog={this.closeDialog}
            remove={this.confirmRemove}
            moduleName={this.moduleName}
            sidebar={sidebar}
          />
        }
        {dialog === 'discardChanges' &&
          <DiscardChangesConfirm
            closeDialog={this.closeDialog}
            discard={this.closeDialogConfirm}
            sidebar={sidebar}
          />
        }
        {dialog === 'colors' &&
          <ColorsDialog
            submit={(newColors) => { this.setState({ color: newColors[0] }); }}
            names={['Kolor przycisku']}
            mainColors={colors}
            sidebar={sidebar}
            closeDialog={this.closeDialog}
            data={dialogData}
            open
          />
        }
      </EditDialog>
    );
  }
}
