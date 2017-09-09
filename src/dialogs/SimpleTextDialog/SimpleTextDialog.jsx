import React, { Component } from 'react';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import validation from '../../js/validation';
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
    this.validate = {
      title: { required: true },
      content: { required: true },
    };
    this.actions = renderActionButtons(this.props.closeDialog, this.submit);
  }

  componentWillMount() {
    const { closeDialog, data: { _id }, setModalFunctions } = this.props;
    const { submit, remove } = this;
    setModalFunctions(_id, submit, closeDialog, remove);
  }

  submit = () => {
    const validateValues = pick(this.state, keys(this.validate));
    validation(this.validate, validateValues, this.validateFailed, this.validateSuccess);
  }

  validateSuccess = () => {
    const values = pick(this.state, ['title', 'content']);
    console.log(values);
    this.props.closeDialog();
  }

  validateFailed = (errors) => {
    this.setState({ errors });
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
