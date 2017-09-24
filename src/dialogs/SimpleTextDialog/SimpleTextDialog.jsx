import React, { Component } from 'react';
import valuesConfig from './valuesConfig';
import RemovingConfirm from '../../dialogs/RemovingConfirm/RemovingConfirm';
import { initializeDialog } from '../../utils/modulesHelpers';
import { renderTextField } from '../../utils/renderHelpers';
import { Form } from './SimpleTextDialog_styles';
import { EditDialog } from '../../utils/globalStyles';

export default class SimpleTextDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'SimpleText', valuesConfig);
  }

  render() {
    const { actions, isEditModal, props: { closeDialog, open, sidebar } } = this;
    const multilineAttrs = {
      multiLine: true,
      rows: 4,
    };

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title={`${isEditModal ? 'Edytuj' : 'Dodaj'} moduł „${this.moduleName}”`}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form>
          {renderTextField(this, 'Nazwa modułu', 'title')}
          {renderTextField(this, 'Treść', 'content', true, multilineAttrs)}
        </Form>
        {this.state.dialog === 'remove' &&
          <RemovingConfirm
            closeDialog={this.closeDialog}
            remove={this.confirmRemove}
            moduleName={this.moduleName}
          />
        }
      </EditDialog>
    );
  }
}
