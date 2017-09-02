import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import { Form, StyledField } from './SimpleTextDialog_styles';
import { EditDialog } from '../../js/globalStyles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class SimpleTextDialog extends Component {
  constructor(props) {
    super(props);
    this.initialized = false;
  }

  componentDidUpdate() {
    const { title, content } = this.props.data;
    if (!this.initialized && this.props.open) {
      this.props.initialize({ title, content });
      this.initialized = true;
    }
  }

  onSubmit = (values) => {
    if (this.props.data.kind) console.log(values);
    else console.log(values);
  }

  makeActivityInfoUpdateHandler = () => {
    this.activityFormButton.click();
  }

  renderField = (name, label, multiLine = false) => (
    <StyledField
      name={name}
      component={TextField}
      floatingLabelText={label}
      floatingLabelFocusStyle={{ fontWeight: 500 }}
      floatingLabelShrinkStyle={{ fontWeight: 900 }}
      style={{ fontWeight: 500 }}
      validate={required}
      multiLine={multiLine}
    />
  );

  render() {
    const { handleSubmit, closeDialog, submitting, pristine, destroy, open } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        disabled={pristine || submitting}
        onTouchTap={() => { this.props.closeDialog(); this.initialized = false; destroy(); }}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.makeActivityInfoUpdateHandler}
        disabled={submitting}
        primary
      />,
    ];

    return (
      <EditDialog
        open={open}
        onRequestClose={() => { closeDialog(); this.initialized = false; destroy(); }}
        actions={actions}
        title="Edytuj podstawowe dane"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={this.props.sidebar}
      >
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderField('title', 'Nazwa modułu')}
          {this.renderField('content', 'Treść', true)}
          <button style={{ visibility: 'hidden' }} type="submit" ref={(button) => { this.activityFormButton = button; }} />
        </Form>
      </EditDialog>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres email';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'SimpleTextDialogForm',
})(SimpleTextDialog);
