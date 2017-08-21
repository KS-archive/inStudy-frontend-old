import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import './cardEditDialog.scss';

export default class CardEditDialog extends Component {
  render() {
    const dialogStyle = this.props.sidebar ? { width: 'calc(100vw - 150px)', marginLeft: 150 } : {};
    console.log(this.props);
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
        className="modal__container edit"
        bodyClassName="cardEditDialog__container"
        style={dialogStyle}
        autoScrollBodyContent
      />
    );
  }
}
