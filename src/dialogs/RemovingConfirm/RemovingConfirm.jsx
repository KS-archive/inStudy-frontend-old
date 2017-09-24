import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


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
        <Dialog
          open
          title="Potwierdzenie usuwania modułu"
          actions={actions}
          modal={false}
          onRequestClose={this.props.closeDialog}
        >
          {`Czy na pewno chcesz nieodwracalnie usunąć moduł „${this.props.moduleName}” i całą jego zawartość?`}
        </Dialog>
      </div>
    );
  }
}
