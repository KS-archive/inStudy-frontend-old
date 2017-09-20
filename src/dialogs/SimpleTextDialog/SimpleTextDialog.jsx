import React, { Component } from 'react';
import validate from '../../js/validation';
import accessibleModules from '../../js/constants/accesibleModules';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { Form } from './SimpleTextDialog_styles';
import { EditDialog } from '../../js/globalStyles';

export default class SimpleTextDialog extends Component {
  constructor(props) {
    super(props);
    const { id, content, title } = this.props.data;
    this.state = {
      title: title || undefined,
      content: content || undefined,
      errors: {},
    };
    this.isEditModal = !!id;
    this.moduleName = accessibleModules.find(m => m.kind === 'SimpleText').name;
    this.toValidate = {
      title: { required: true },
      content: { required: true },
    };
    this.values = ['title', 'content'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  componentWillMount() {
    const { closeDialog, data: { id }, setModalFunctions } = this.props;
    const { handleSubmit, remove } = this;
    setModalFunctions(id, handleSubmit, closeDialog, remove);
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
