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

  componentDidMount() {
    this.props.setModalFunctions({
      submit: this.makeActivityInfoUpdateHandler,
      cancel: this.cancel,
      remove: this.props.data._id ? this.remove : null,
      changeColors: null,
    });
  }

  componentDidUpdate() {
    const { title, content } = this.props.data;
    if (!this.initialized && this.props.open) {
      this.props.initialize({ title, content });
      this.initialized = true;
    }
  }

  submit = (values) => {
    if (this.props.data.kind) console.log(values);
    else console.log(values);
  }

  cancel = () => {
    this.props.closeDialog();
    this.initialized = false;
    this.props.destroy();
  }

  remove = () => {
    console.log(this.props);
  }

  makeActivityInfoUpdateHandler = () => {
    this.activityFormButton.click();
  }

  renderField = (name, label, multiLine = false, rows = 1) => (
    <StyledField
      name={name}
      component={TextField}
      floatingLabelText={label}
      floatingLabelFocusStyle={{ fontWeight: 500 }}
      floatingLabelShrinkStyle={{ fontWeight: 900 }}
      style={{ fontWeight: 500 }}
      validate={required}
      multiLine={multiLine}
      rows={rows}
    />
  );

  render() {
    console.log(this.props);
    const title = this.props.data._id
      ? 'Edytuj moduł typu „Tekst (markdown)”'
      : 'Dodaj moduł typu „Tekst (markdown)”';
    const { handleSubmit, closeDialog, submitting, pristine, open } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        disabled={pristine || submitting}
        onTouchTap={this.cancel}
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
        onRequestClose={this.cancel}
        actions={actions}
        title={title}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={this.props.sidebar}
      >
        <Form onSubmit={handleSubmit(this.submit)}>
          {this.renderField('title', 'Nazwa modułu')}
          {this.renderField('content', 'Treść', true, 4)}
          <button style={{ visibility: 'hidden' }} type="submit" ref={(button) => { this.activityFormButton = button; }} />
        </Form>
      </EditDialog>
    );
  }
}

export default reduxForm({
  form: 'SimpleTextDialogForm',
})(SimpleTextDialog);
