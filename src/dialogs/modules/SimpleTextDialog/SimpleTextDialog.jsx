import React, { Component } from 'react';
import valuesConfig from './valuesConfig';
import RemovingConfirm from '../../../dialogs/helpers/RemovingConfirm/RemovingConfirm';
import DiscardChangesConfirm from '../../../dialogs/helpers/DiscardChangesConfirm/DiscardChangesConfirm';
import { initializeDialog } from '../../../utils/modulesHelpers';
import { renderTextField } from '../../../utils/renderHelpers';
import { Form } from './SimpleTextDialog_styles';
import { EditDialog } from '../../../utils/globalStyles';

export default class SimpleTextDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'SimpleText', valuesConfig);
  }

  render() {
    const { props: { open, sidebar }, state: { dialog } } = this;
    const multilineAttrs = {
      multiLine: true,
      rows: 4,
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
      </EditDialog>
    );
  }
}
