import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { SelectField, TextField } from 'redux-form-material-ui';
import { cities, universities, types, categories, subcategories } from './helper';
import './signUp.scss';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class SignUp extends Component {
  onSubmit = (values) => {
    console.log(values);
    axios.post('http://localhost:8080/api/user/register', values).then((res) => {
      console.log(res);
    }, ({ response }) => {
      console.log(response.data.message);
    });
  }

  renderTextField(name, label, type) {
    return (
      <Field
        className="signup__field"
        name={name}
        type={type}
        component={TextField}
        floatingLabelText={label}
        floatingLabelFocusStyle={{ fontWeight: 500 }}
        floatingLabelShrinkStyle={{ fontWeight: 900 }}
        style={{ width: 295, fontWeight: 500 }}
        validate={required}
      />
    );
  }

  renderSelectField(name, label, items) {
    return (
      <Field
        className="signup__field"
        name={name}
        component={SelectField}
        floatingLabelText={label}
        floatingLabelFocusStyle={{ fontWeight: 500 }}
        floatingLabelShrinkStyle={{ fontWeight: 900 }}
        style={{ width: 295, fontWeight: 500 }}
        validate={required}
        autoWidth
      >
        {items.map(value => <MenuItem key={value.id} value={value.id} primaryText={value.text} />)}
      </Field>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="signup__container">
        <div className="signup__content">
          <form className="signup__form" onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className="signup__header">Rejestracja</h1>
            {this.renderTextField('email', 'E-mail', 'text')}
            {this.renderTextField('password', 'Hasło', 'password')}
            {this.renderTextField('password2', 'Powtórz hasło', 'password')}
            {this.renderSelectField('city', 'Miasto', cities)}
            {this.renderSelectField('university', 'Uczelnia', universities)}
            {this.renderTextField('name', 'Nazwa aktywności', 'text')}
            {this.renderSelectField('type', 'Typ aktywności', types)}
            {this.renderSelectField('category', 'Kategoria', categories)}
            {this.renderSelectField('subcategory', 'Podkategoria', subcategories)}
            {this.renderTextField('tags', 'Tagi')}
            <div className="signup__buttonContainer">
              <RaisedButton
                className="signup__button"
                label="Zarejestruj się"
                labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
                type="submit"
                primary
              />
            </div>
          </form>
          <div className="signup__bottom">
            <p className="signup__bottomText">Posiadasz już konto?</p>
            <FlatButton
              label="Zaloguj się"
              labelStyle={{ color: '#fff' }}
              onTouchTap={() => { this.props.history.push('/logowanie'); }}
            />
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Błędny adres email';
  }
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
  form: 'SignUpForm',
})(SignUp);
