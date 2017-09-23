import React, { Component } from 'react';
import valuesConfig from './valuesConfig';
import validate from '../../utils/validation';
import { initializeDialog } from '../../utils/modulesHelpers';
import { renderTextField } from '../../utils/renderHelpers';
import { Form } from './SimpleTextDialog_styles';
import { EditDialog } from '../../utils/globalStyles';

export default class SimpleTextDialog extends Component {
  componentWillMount() {
    initializeDialog(this, 'SimpleText', valuesConfig);
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    const { data, kind, submit } = this.props;
    const id = data.id ? { id: data.id } : {};
    const extendValues = { ...values, ...id, kind };
    submit(extendValues);
  }

  remove = () => {
    this.props.remove(this.props.data.id);
    this.props.closeDialog();
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
      </EditDialog>
    );
  }
}
