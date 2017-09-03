import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { hasAnyValue } from '../../../js/utils';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container } from './AddCollapsible_styles';

export default class SocialsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data ? this.props.data.title : undefined,
      description: this.props.data ? this.props.data.description : undefined,
      errors: {
        title: null,
        description: null,
      },
    };
  }

  validate = (callback) => {
    const errors = { ...this.state.errors };
    const { title, description } = this.state;
    errors.title = (!title || !title.trim()) ? 'To pole jest wymagane' : null;
    errors.description = (!description || !description.trim()) ? 'To pole jest wymagane' : null;
    if (hasAnyValue(errors)) this.setState({ errors });
    else callback();
  }

  submit = () => {
    this.validate(() => {
      this.props.submit({
        title: this.state.title,
        description: this.state.description,
      });
      this.props.closeDialog();
    });
  }

  render() {
    const { closeDialog, open, sidebar, data } = this.props;
    const { title, description } = this.state;
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
            value={title}
            onChange={(e) => { this.setState({ title: e.target.value }); }}
            floatingLabelText="Nagłówek"
            errorText={this.state.errors.title}
            fullWidth
            {...inputStyle}
          />
          <TextField
            value={description}
            onChange={(e) => { this.setState({ description: e.target.value }); }}
            floatingLabelText="Treść"
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
