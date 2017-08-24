import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import { addNotification } from '../../actions/notifications';
import { fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories } from '../../actions/helpers';
import './signUp.scss';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class SignUp extends Component {
  componentWillMount() {
    this.props.fetchCities();
    this.props.fetchTypes();
    this.props.fetchCategories();
  }

  onSubmit = (values) => {
    axios.post('http://localhost:8080/api/user/register', values).then((res) => {
      this.props.addNotification('Zarejestrowano', res.data.message, 'success');
      this.props.history.push('/');
    }, ({ response }) => {
      this.props.addNotification('Wystąpił błąd', response.data.message, 'error');
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

  renderSelectField(name, label, items, changefc) {
    if (items && items.length !== 0) {
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
          onChange={changefc}
        >
          {Object.keys(items).map(key => <MenuItem key={key} value={items[key].id} primaryText={items[key].name} />)}
        </Field>
      );
    }
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
        onChange={changefc}
        disabled
      />
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
            {this.renderSelectField('city', 'Miasto', this.props.selectHelpers.cities, (e, key) => { this.props.fetchUniversities(key); })}
            {this.renderSelectField('university', 'Uczelnia', this.props.selectHelpers.universities)}
            {this.renderTextField('name', 'Nazwa aktywności', 'text')}
            {this.renderSelectField('type', 'Typ aktywności', this.props.selectHelpers.types)}
            {this.renderSelectField('category', 'Kategoria', this.props.selectHelpers.categories, (e, key) => { this.props.fetchSubactegories(key); })}
            {this.renderSelectField('subcategory', 'Podkategoria', this.props.selectHelpers.subcategories)}
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

function mapStateToProps(state) {
  return {
    selectHelpers: state.selectHelpers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNotification, fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories }, dispatch);
}

export default reduxForm({
  validate,
  form: 'SignUpForm',
})(connect(mapStateToProps, mapDispatchToProps)(SignUp));
