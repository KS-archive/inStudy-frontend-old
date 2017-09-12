import React, { Component } from 'react';
import axios from 'axios';
import validate from '../../js/validation';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Form } from './ChangePasswordDialog_styles';

export default class ChangePasswordDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      errors: {},
    };

    this.toValidate = {
      currentPassword: { required: true },
      newPassword: { required: true },
      repeatNewPassword: { required: true, equalPasswords: 'newPassword' },
    };
    this.values = ['newPassword'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  changePassword = (password) => {
    const url = `${__ROOT_URL__}api/modules`;
    const headers = getTokenHeader();
    console.log(password);
    axios.post(url, password, { headers }).then((data) => {
      console.log(data);
    });
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    console.log(values);
    // const { data, kind, closeDialog, submit } = this.props;
    // const id = data.id ? { id: data.id } : {};
    // const extendValues = { ...values, ...id, kind };
    // submit(extendValues);
    // closeDialog();
  }

  render() {
    const { closeDialog, sidebar } = this.props;

    return (
      <EditDialog
        open
        onRequestClose={closeDialog}
        actions={this.actions}
        title="Zmień hasło"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form>
          {renderTextField(this, 'Obecne hasło', 'currentPassword')}
          {renderTextField(this, 'Nowe hasło', 'newPassword')}
          {renderTextField(this, 'Powtórz nowe hasło', 'repeatNewPassword')}
        </Form>
      </EditDialog>
    );
  }
}
