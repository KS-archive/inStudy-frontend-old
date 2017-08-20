import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import './passwordRecoveryNew.scss';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class PasswordRecoveryNew extends Component {
  onSubmit = (values) => {
    console.log(values);
  }

  renderTextField(name, label, type) {
    return (
      <Field
        className="passwordRecoveryNew__field"
        name={name}
        type={type}
        component={TextField}
        floatingLabelText={label}
        floatingLabelFocusStyle={{ fontWeight: 500 }}
        floatingLabelShrinkStyle={{ fontWeight: 900 }}
        style={{ width: 350, fontWeight: 500 }}
        validate={required}
      />
    );
  }

  render() {
    const { handleSubmit } = this.props;
    console.log(this.props);

    return (
      <div className="passwordRecoveryNew__container">
        <div className="passwordRecoveryNew__content">
          <form className="passwordRecoveryNew__form" onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className="passwordRecoveryNew__header">Utwórz nowe hasło</h1>
            {this.renderTextField('password', 'Hasło', 'password')}
            {this.renderTextField('password2', 'Powtórz hasło', 'password')}
            <div className="passwordRecoveryNew__buttonContainer">
              <RaisedButton
                className="passwordRecoveryNew__button"
                label="Zmień hasło"
                labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
                type="submit"
                primary
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.password !== values.password2) {
    errors.password2 = 'Podano 2 różne hasła';
  }
  if (values.password && values.password.length < 8) {
    errors.password = 'Hasło musi zawierać co najmniej 8 znaków';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PasswordRecoveryNewForm',
})(PasswordRecoveryNew);
