import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { StyledDialog } from './DiscardChangesConfirm_styles';


export default class DiscardChangesConfirm extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Nie (wróć do edycji)"
        primary
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Tak (anuluj zmiany)"
        primary
        onClick={this.props.discard}
      />,
    ];

    return (
      <div>
        <StyledDialog
          open
          title="Posiadasz niezapisane zmiany"
          actions={actions}
          modal={false}
          sidebar={this.props.sidebar}
          onRequestClose={this.props.closeDialog}
        >
          {'W module zostały wprowadzone zmiany, które nie zostały zapisane. Czy na pewno chcesz anulować wszystkie zmiany wprowadzone w module?'}
        </StyledDialog>
      </div>
    );
  }
}
