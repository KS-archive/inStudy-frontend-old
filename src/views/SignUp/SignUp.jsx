import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import SelectField from 'redux-form-material-ui/lib/SelectField';
import DocumentMeta from 'react-document-meta';
import { addNotification } from '../../actions/notifications';
import { cities, types, categories } from '../../js/constants/filterData';
import { StyledRaisedButton } from '../../js/globalStyles';
import { Container, Content, Form, Header, StyledField, ButtonContainer, Bottom, BottomText } from './SignUp_styles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universities: null,
      subcategories: null,
    };
  }

  onSubmit = (values) => {
    axios.post(`${__ROOT_URL__}api/user/register`, values).then((res) => {
      this.props.addNotification('Zarejestrowano', res.data.message, 'success');
      this.props.history.push('/');
    }, ({ response }) => {
      if (response.status === 409) {
        this.props.addNotification('Wystąpił błąd', 'Podany e-mail już znajduje się w naszej bazie', 'error');
      } else {
        this.props.addNotification('Wystąpił błąd', response.data.message, 'error');
      }
    });
  }

  setUniversities = (cityId) => {
    const universities = cities[cityId].universities;
    this.props.change('university', null);
    this.setState({ universities });
  }

  setSubcategories = (categoryId) => {
    const subcategories = categories[categoryId].subcategories;
    this.props.change('subcategory', null);
    this.setState({ subcategories });
  }

  renderTextField(name, label, type) {
    return (
      <StyledField
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
    const fieldAttrs = {
      name,
      component: SelectField,
      floatingLabelText: label,
      floatingLabelFocusStyle: { fontWeight: 500 },
      floatingLabelShrinkStyle: { fontWeight: 500 },
      style: { width: 295, fontWeight: 500 },
      onChange: changefc,
      validate: required,
    };
    return (items && items.length !== 0)
      ? (
        <StyledField {...fieldAttrs}>
          {Object.keys(items).map(key =>
            <MenuItem key={items[key].id} value={items[key].id} primaryText={items[key].name} />)
          }
        </StyledField>
      )
      : <StyledField disabled {...fieldAttrs} />;
  }

  render() {
    const { handleSubmit } = this.props;
    const meta = {
      title: 'inStudy - Rejestracja',
    };

    return (
      <Container>
        <DocumentMeta {...meta} />
        <Content>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Header>Rejestracja</Header>
            {this.renderTextField('email', 'E-mail', 'text')}
            {this.renderTextField('password', 'Hasło', 'password')}
            {this.renderTextField('password2', 'Powtórz hasło', 'password')}
            {this.renderSelectField('city', 'Miasto', cities, (e, key) => { this.setUniversities(key); })}
            {this.renderSelectField('university', 'Uczelnia', this.state.universities)}
            {this.renderTextField('name', 'Nazwa inicjatywy', 'text')}
            {this.renderSelectField('type', 'Typ inicjatywy', types)}
            {this.renderSelectField('category', 'Kategoria', categories, (e, key) => { this.setSubcategories(key); })}
            {this.renderSelectField('subcategory', 'Podkategoria', this.state.subcategories)}
            {this.renderTextField('tags', 'Tagi (oddzielone przecinkami)')}
            <ButtonContainer>
              <StyledRaisedButton
                label="Zarejestruj się"
                type="submit"
                primary
              />
            </ButtonContainer>
          </Form>
          <Bottom>
            <BottomText>Posiadasz już konto?</BottomText>
            <FlatButton
              label="Zaloguj się"
              labelStyle={{ color: '#fff' }}
              onTouchTap={() => { this.props.history.push('/logowanie'); }}
            />
          </Bottom>
        </Content>
      </Container>
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
  return bindActionCreators({ addNotification }, dispatch);
}

export default reduxForm({
  validate,
  form: 'SignUpForm',
})(connect(mapStateToProps, mapDispatchToProps)(SignUp));
