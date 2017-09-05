import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { hasAnyValue } from '../../../js/utils';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container } from './NewNumber_styles';

export default class SocialsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.data ? this.props.data.number : undefined,
      description: this.props.data ? this.props.data.description : undefined,
      errors: {
        number: null,
        description: null,
      },
    };
  }

  validate = (callback) => {
    const errors = { ...this.state.errors };
    const { number, description } = this.state;
    const naturalReg = /^(0|([1-9]\d*))$/;

    if (!number || !number.trim()) errors.number = 'To pole jest wymagane';
    else if (!naturalReg.test(number)) errors.number = 'Wartość w tym polu musi być liczbą naturalną';
    if (!description || !description.trim()) errors.description = 'To pole jest wymagane';
    if (hasAnyValue(errors)) this.setState({ errors });
    else callback();
  }

  submit = () => {
    this.validate(() => {
      this.props.submit({
        number: this.state.number,
        description: this.state.description,
      });
      this.props.closeDialog();
    });
  }

  render() {
    const { closeDialog, open, sidebar, data } = this.props;
    const { number, description } = this.state;
    const actions = [
      <FlatButton
        label="Anuluj"
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.submit}
        primary
      />,
    ];

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title={data ? 'Edytuj element listy' : 'Dodaj element listy'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <TextField
            value={number}
            onChange={(e) => { this.setState({ number: e.target.value }); }}
            floatingLabelText="Liczba"
            errorText={this.state.errors.number}
            fullWidth
            {...inputStyle}
          />
          <TextField
            value={description}
            onChange={(e) => { this.setState({ description: e.target.value }); }}
            floatingLabelText="Opis"
            errorText={this.state.errors.description}
            fullWidth
            multiLine
            rows={3}
            {...inputStyle}
          />
        </Container>
      </EditDialog>
    );
  }
}
