import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { StyledDialog } from './RemovingConfirm_styles';


export default class RemovingConfirm extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Nie (pozostaw moduł)"
        primary
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Tak (usuń moduł)"
        primary
        onClick={this.props.remove}
      />,
    ];

    return (
      <div>
        <StyledDialog
          open
          title="Potwierdzenie usuwania modułu"
          actions={actions}
          modal={false}
          sidebar={this.props.sidebar}
          onRequestClose={this.props.closeDialog}
        >
          {`Czy na pewno chcesz nieodwracalnie usunąć moduł „${this.props.moduleName}” i całą jego zawartość?`}
        </StyledDialog>
      </div>
    );
  }
}
