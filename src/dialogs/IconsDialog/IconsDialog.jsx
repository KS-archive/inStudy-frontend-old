import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { EditDialog } from '../../js/globalStyles';
import { Container } from './IconsDialog_styles';

export default class IconsDialog extends Component {
  submit = () => {
    console.log(obj);
  }

  render() {
    const { closeDialog, submit, open, sidebar, data } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={submit}
        primary
      />,
    ];

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title={data ? 'Edytuj ikonę' : 'Dodaj ikonę'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {this.renderIcons()}
        </Container>
      </EditDialog>
    );
  }
}
