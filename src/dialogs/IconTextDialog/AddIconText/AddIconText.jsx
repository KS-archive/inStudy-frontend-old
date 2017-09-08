import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconsDialog from '../../IconsDialog/IconsDialog';
import { hasAnyValue } from '../../../js/utils';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container, LabelHeader, IconImageWrapper, IconImage } from './AddIconText_styles';

export default class AddIconText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data ? this.props.data.title : undefined,
      description: this.props.data ? this.props.data.description : undefined,
      icon: this.props.data ? this.props.data.icon : undefined,
      errors: {
        title: null,
        description: null,
      },
      dialog: false,
    };
  }

  validate = (callback) => {
    const errors = { ...this.state.errors };
    const { title, description, icon } = this.state;
    errors.title = null;
    errors.description = null;

    if (!title || !title.trim()) {
      errors.title = 'To pole jest wymagane';
    } else if (!icon) {
      errors.title = 'Aby utworzyć kolumnę muszisz wybrać ikonę';
    }

    if (!description || !description.trim()) {
      errors.description = 'To pole jest wymagane';
    }

    if (hasAnyValue(errors)) this.setState({ errors });
    else callback();
  }

  handleSubmit = () => {
    this.validate(() => {
      const { title, description, icon } = this.state;
      this.props.submit({ title, description, icon });
      this.props.closeDialog();
    });
  }

  submitIcon = (icon) => {
    this.setState({ icon, dialog: false });
  }

  render() {
    const { closeDialog, open, sidebar, data } = this.props;
    const { title, description, icon, dialog } = this.state;
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
            errorText={this.state.errors.title}
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
