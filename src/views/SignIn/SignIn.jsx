import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import { addNotification } from '../../actions/notifications';
import './signIn.scss';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class SignIn extends Component {
  onSubmit = (values) => {
    axios.post('http://localhost:8080/api/user/login', values).then((res) => {
      this.props.addNotification('Zalogowano', res.data.message, 'success');
    }, ({ response }) => {
      this.props.addNotification('Wystąpił błąd', response.data.message, 'error');
    });
  }

  renderTextField(name, label, type) {
    return (
      <Field
        className="signin__field"
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

    return (
      <div className="signin__container">
        <div className="signin__content">
          <form className="signin__form" onSubmit={handleSubmit(this.onSubmit)}>
            <h1 className="signin__header">Logowanie</h1>
            {this.renderTextField('email', 'E-mail', 'text')}
            {this.renderTextField('password', 'Hasło', 'password')}
            <div className="signin__buttonContainer">
              <RaisedButton
                className="signin__button"
                label="Zaloguj się"
                labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
                type="submit"
                primary
              />
            </div>
            <p
              className="signin__recovery"
              onClick={() => { this.props.history.push('/odzyskiwanie_hasla'); }}
            >Zapomniałem hasła</p>
          </form>
          <div className="signin__bottom">
            <p className="signin__bottomText">Nie posiadasz jeszcze konta?</p>
            <FlatButton
              label="Zarejestruj się"
              labelStyle={{ color: '#fff' }}
              onTouchTap={() => { this.props.history.push('/rejestracja'); }}
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

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNotification }, dispatch);
}

export default reduxForm({
  validate,
  form: 'SignInForm',
})(connect(null, mapDispatchToProps)(SignIn));
