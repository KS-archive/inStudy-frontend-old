import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { inputStyle } from './constants/styles';

export const renderActionButtons = (cancel, submit) => [
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

export const renderTextField = (comp, label, stateName, fullWidth = true, extend = {}) => {
  const attrs = {
    floatingLabelText: label,
    fullWidth,
    value: comp.state[stateName],
    onChange: (e) => { comp.setState({ [stateName]: e.target.value }); },
    errorText: (stateName === 'title')
      ? (comp.state.errors[stateName] || comp.state.errors.content)
      : comp.state.errors[stateName],
    ...inputStyle,
    ...extend,
  };
  return <TextField {...attrs} />;
};
