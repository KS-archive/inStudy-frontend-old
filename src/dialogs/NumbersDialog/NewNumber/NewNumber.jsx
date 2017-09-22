import React, { Component } from 'react';
import validate from '../../../utils/validation';
import { renderActionButtons, renderTextField } from '../../../utils/renderHelpers';
import { EditDialog } from '../../../utils/globalStyles';
import { Container } from './NewNumber_styles';

export default class SocialsDialog extends Component {
  constructor(props) {
    super(props);
    const { data, closeDialog } = this.props;
    this.state = {
      number: data ? data.number : undefined,
      description: data ? data.description : undefined,
      errors: {},
    };
    this.toValidate = {
      number: { required: true, naturalNumber: true },
      description: { required: true },
    };
    this.values = ['number', 'description'];
    this.actions = renderActionButtons(closeDialog, this.handleSubmit);
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    this.props.submit(values);
    this.props.closeDialog();
  }

  render() {
    const { closeDialog, open, sidebar, data } = this.props;
    const dialogTitle = data ? 'Edytuj element listy' : 'Dodaj element listy';
    const multilineAttrs = {
      multiLine: true,
      rows: 3,
    };

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title={dialogTitle}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {renderTextField(this, 'Liczba', 'number')}
          {renderTextField(this, 'Opis', 'description', true, multilineAttrs)}
        </Container>
      </EditDialog>
    );
  }
}
