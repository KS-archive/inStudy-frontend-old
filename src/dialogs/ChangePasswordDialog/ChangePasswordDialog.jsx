import React, { Component } from 'react';
import axios from 'axios';
import validate from '../../js/validation';
import { getTokenHeader } from '../../js/utils';
import { renderActionButtons, renderTextField } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Form } from './ChangePasswordDialog_styles';

export default class ChangePasswordDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      errors: {},
    };

    this.toValidate = {
      oldPassword: { required: true },
      newPassword: { required: true },
      repeatNewPassword: { required: true, equalPasswords: 'newPassword' },
    };
    this.values = ['oldPassword', 'newPassword'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    console.log(values);
    const url = `${__ROOT_URL__}api/user/password`;
    const headers = getTokenHeader();
    axios.put(url, values, { headers }).then(
      (data) => {
        console.log(data);
        this.props.closeDialog();
      }, (err) => {
        console.log(err);
      });
  }

  render() {
    const { closeDialog, sidebar } = this.props;
    const type = { type: 'password' };

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
          {renderTextField(this, 'Obecne hasło', 'oldPassword', true, type)}
          {renderTextField(this, 'Nowe hasło', 'newPassword', true, type)}
          {renderTextField(this, 'Powtórz nowe hasło', 'repeatNewPassword', true, type)}
        </Form>
      </EditDialog>
    );
  }
}
