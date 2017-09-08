import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconsDialog from '../../IconsDialog/IconsDialog';
import validation from '../../../js/validation';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container, LabelHeader, IconImageWrapper, IconImage } from './AddIconText_styles';

export default class AddIconText extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      title: data ? data.title : undefined,
      description: data ? data.description : undefined,
      icon: data ? data.icon : undefined,
      errors: {},
      dialog: false,
    };
    this.validate = {
      title: { required: true },
      description: { required: true },
      icon: { required: 'Aby utworzyć kolumnę muszisz wybrać ikonę' },
    };
  }

  handleSubmit = () => {
    const { title, description, icon } = this.state;
    const values = { title, description, icon };
    validation(
      this.validate,
      values,
      (errors) => { this.setState({ errors }); },
      () => {
        this.props.submit({ title, description, icon });
        this.props.closeDialog();
      },
    );
  }

  submitIcon = (icon) => {
    this.setState({ icon, dialog: false });
  }

  render() {
    const { closeDialog, open, sidebar, data } = this.props;
    const { title, description, icon, dialog, errors } = this.state;
    const actions = [
      <FlatButton
        label="Anuluj"
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.handleSubmit}
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
            errorText={errors.title || errors.icon}
            fullWidth
            {...inputStyle}
          />
          <TextField
            value={description}
            onChange={(e) => { this.setState({ description: e.target.value }); }}
            floatingLabelText="Opis"
            errorText={errors.description}
            fullWidth
            multiLine
            rows={3}
            {...inputStyle}
          />
          <LabelHeader>Ikona</LabelHeader>
          <IconImageWrapper onClick={() => { this.setState({ dialog: true }); }}>
            {(icon)
              ? <IconImage className={`fa fa-${icon}`} aria-hidden="true" />
              : '+'
            }
          </IconImageWrapper>
        </Container>
        {(dialog) &&
          <IconsDialog
            open
            submit={(newIcon) => { this.submitIcon(newIcon); }}
            closeDialog={() => { this.setState({ dialog: false }); }}
            data={icon}
            sidebar={sidebar}
          />
        }
      </EditDialog>
    );
  }
}
