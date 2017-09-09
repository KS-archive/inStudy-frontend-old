import React from 'react';
import FlatButton from 'material-ui/FlatButton';

export const renderActionButtons = (cancel, submit) => {
  return [
    <FlatButton
      label="Anuluj"
      onTouchTap={cancel}
    />,
    <FlatButton
      label="Zapisz zmiany"
      onTouchTap={submit}
      primary
    />,
  ];
};
