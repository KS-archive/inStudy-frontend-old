import React, { Component } from 'react';
import validate from '../../js/validation';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { Form } from './SimpleTextDialog_styles';
import { EditDialog } from '../../js/globalStyles';

export default class SimpleTextDialog extends Component {
  constructor(props) {
    super(props);
    const { _id, content, title } = this.props.data;
    this.state = {
      title: title || undefined,
      content: content || undefined,
      errors: {},
    };

    this.isEditModal = !!_id;
    this.toValidate = {
      title: { required: true },
      content: { required: true },
    };
    this.values = ['title', 'content'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  componentWillMount() {
    const { closeDialog, data: { _id }, setModalFunctions } = this.props;
    const { handleSubmit, remove } = this;
    setModalFunctions(_id, handleSubmit, closeDialog, remove);
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    const { data: { _id }, kind, closeDialog } = this.props;
    const extendValues = { ...values, _id, kind };
    console.log(extendValues);
    closeDialog();
  }

  remove = () => {
    console.log('removed!');
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
        title={`${isEditModal ? 'Edytuj' : 'Dodaj'} moduł „Tekst (markdown)”`}
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
