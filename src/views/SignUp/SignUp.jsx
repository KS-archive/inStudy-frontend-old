import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import axios from 'axios';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import HelmetHeader from './Header';
import validate from '../../utils/validation';
import { inputStyle } from '../../utils/constants/styles';
import { addNotification } from '../../actions/notifications';
import { cities, types, categories } from '../../utils/constants/filterData';
import { StyledRaisedButton } from '../../utils/globalStyles';
import { Container, Content, Form, Header, StyledTextField, StyledSelectField, StyledCheckbox, ButtonContainer, Bottom, BottomText } from './SignUp_styles';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      password: undefined,
      password2: undefined,
      type: undefined,
      category: undefined,
      subcategory: undefined,
      city: undefined,
      university: undefined,
      tags: undefined,
      newsletter: true,
      errors: {},
      universities: [],
      subcategories: [],
    };
    this.toValidate = {
      name: { required: true },
      email: { required: true },
      password: { required: true, minLength: 8 },
      password2: { required: true, equalPasswords: 'password', minLength: 8 },
      type: { required: true },
      category: { required: true },
      subcategory: { required: true },
      city: { required: true },
      university: { required: true },
      tags: { required: true },
    };
    this.values = ['name', 'type', 'category', 'subcategory', 'city', 'university', 'email', 'tags', 'password', 'password2', 'newsletter'];
  }

  setUniversities = (cityId) => {
    const universities = cities[cityId].universities;
    this.setState({ universities, university: undefined });
  }

  setSubcategories = (categoryId) => {
    const subcategories = categories[categoryId].subcategories;
    this.setState({ subcategories, subcategory: undefined });
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
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

  renderTextField(name, floatingLabelText, type) {
    const { errors } = this.state;
    const noError = { ...errors, [name]: undefined };
    const attrs = {
      type,
      floatingLabelText,
      value: this.state[name],
      onChange: (e) => { this.setState({ [name]: e.target.value, errors: noError }); },
      errorText: errors[name],
      ...inputStyle,
    };
    return <StyledTextField {...attrs} />;
  }

  renderSelectField(name, floatingLabelText, items, changeFc = () => {}) {
    const { errors } = this.state;
    const noError = { ...errors, [name]: undefined };
    const attrs = {
      floatingLabelText,
      onChange: (event, index, value) => {
        this.setState({ [name]: value, errors: noError }, () => { changeFc(value); });
      },
      value: this.state[name] && this.state[name].toString(),
      errorText: errors[name],
      disabled: (items.length === 0),
      ...inputStyle,
    };

    return (
      <StyledSelectField {...attrs}>
        {Object.keys(items).map(key => (
          <MenuItem key={items[key].id} value={items[key].id} primaryText={items[key].name} />
        ))}
      </StyledSelectField>
    );
  }

  renderCheckbox = (label, stateName) => {
    const checked = this.state[stateName];
    const onCheck = () => { this.setState({ [stateName]: !checked }); };
    const attrs = { label, checked, onCheck };
    return <StyledCheckbox {...attrs} />;
  }

  render() {
    const { universities, subcategories } = this.state;

    return (
      <Container>
        <HelmetHeader />
        <Content>
          <Form>
            <Header>Rejestracja</Header>
            {this.renderTextField('name', 'Nazwa inicjatywy', 'text')}
            {this.renderTextField('email', 'E-mail', 'text')}
            {this.renderTextField('password', 'Hasło', 'password')}
            {this.renderTextField('password2', 'Powtórz hasło', 'password')}
            {this.renderSelectField('city', 'Miasto', cities, this.setUniversities)}
            {this.renderSelectField('university', 'Uczelnia', universities)}
            {this.renderSelectField('category', 'Kategoria', categories, this.setSubcategories)}
            {this.renderSelectField('subcategory', 'Podkategoria', subcategories)}
            {this.renderSelectField('type', 'Typ inicjatywy', types)}
            {this.renderTextField('tags', 'Tagi (oddzielone przecinkami)')}
            {this.renderCheckbox('Chcę otrzymywać wiadomości od inStudy dotyczące nowych funkcjonalności portalu', 'newsletter')}
            <ButtonContainer>
              <StyledRaisedButton
                label="Zarejestruj się"
                type="submit"
                primary
                onClick={(e) => { e.preventDefault(); this.handleSubmit(); }}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNotification }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);
