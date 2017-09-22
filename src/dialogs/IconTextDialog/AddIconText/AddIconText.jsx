import React, { Component } from 'react';
import IconsDialog from '../../IconsDialog/IconsDialog';
import validate from '../../../utils/validation';
import { renderActionButtons, renderTextField } from '../../../utils/renderHelpers';
import { EditDialog } from '../../../utils/globalStyles';
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
    this.toValidate = {
      title: { required: true },
      description: { required: true },
      icon: { required: 'Aby utworzyć kolumnę muszisz wybrać ikonę' },
    };
    this.values = ['title', 'description', 'icon'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    console.log(values);
    this.props.submit(values);
    this.props.closeDialog();
  }

  submitIcon = (icon) => {
    this.setState({ icon, dialog: false });
  }

  render() {
    const { closeDialog, open, sidebar, data } = this.props;
    const { icon, dialog } = this.state;
    const dialogTitle = data ? 'Edytuj element listy' : 'Dodaj element listy';
    const multilineAttrs = {
      multiLine: true,
      rows: 4,
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
          {renderTextField(this, 'Nagłówek', 'title')}
          {renderTextField(this, 'Opis', 'description', true, multilineAttrs)}
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
