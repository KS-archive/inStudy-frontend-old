import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import './simpleTextDialog.scss';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class SimpleTextDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
    };
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
    console.log(values);
  }

  render() {
    console.log(this.props);
    const { handleSubmit, submitting, pristine, destroy } = this.props;
    const dialogStyle = this.props.sidebar ? { width: 'calc(100vw - 150px)', marginLeft: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 0, marginTop: -30 } : { display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 0, marginTop: -30 };
    const actions = [
      <FlatButton
        className="simpleTextDialog__button"
        label="Anuluj"
        labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
        disabled={pristine || submitting}
        onClick={() => { this.props.closeDialog(); this.initialized = false; destroy(); }}
      />,
      <RaisedButton
        className="simpleTextDialog__button"
        label="Zapisz zmiany"
        type="submit"
        labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
        disabled={submitting}
        primary
      />,
    ];
    console.log(this.props);

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={() => { this.props.closeDialog(); this.initialized = false; destroy(); }}
        className="modal__container edit"
        bodyClassName="simpleTextDialog__container"
        style={dialogStyle}
        actions={actions}
        actionsContainerClassName="simpleTextDialog__buttonContainer"
        title="Edytuj podstawowe dane"
        titleClassName="simpleTextDialog__header"
        autoScrollBodyContent
        repositionOnUpdate={false}
      >
        <form className="simpleTextDialog__form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            className="simpleTextDialog__input"
            name="title"
            component={TextField}
            floatingLabelText="Nazwa modułu"
            floatingLabelFocusStyle={{ fontWeight: 500 }}
            floatingLabelShrinkStyle={{ fontWeight: 900 }}
            style={{ fontWeight: 500 }}
            validate={required}
          />
          <Field
            className="simpleTextDialog__textarea"
            name="content"
            multiLine
            component={TextField}
            floatingLabelText="Treść"
            floatingLabelFocusStyle={{ fontWeight: 500 }}
            floatingLabelShrinkStyle={{ fontWeight: 900 }}
            style={{ fontWeight: 500 }}
            validate={required}
          />
        </form>
      </Dialog>
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
