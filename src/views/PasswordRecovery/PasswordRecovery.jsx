import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import './passwordRecovery.scss';

class PasswordRecovery extends Component {
  onSubmit = (values) => {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="passwordRecovery__container">
        <div className="passwordRecovery__content">
          <form className="passwordRecovery__form" onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className="passwordRecovery__header">Odzyskiwanie hasła</h1>
            <Field
              className="passwordRecovery__field"
              name="email"
              component={TextField}
              floatingLabelText="E-mail"
              floatingLabelFocusStyle={{ fontWeight: 500 }}
              floatingLabelShrinkStyle={{ fontWeight: 900 }}
              style={{ width: 350, fontWeight: 500 }}
            />
            <div className="passwordRecovery__buttonContainer">
              <RaisedButton
                className="passwordRecovery__button"
                label="Wyślij"
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

  if (!values.email) {
    errors.email = 'E-mail jest polem wymaganym';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres email';
  }


  return errors;
}

export default reduxForm({
  validate,
  form: 'PasswordRecoveryForm',
})(PasswordRecovery);
