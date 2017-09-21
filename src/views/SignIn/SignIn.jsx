import React, { PureComponent } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'redux-form-material-ui/lib/TextField';
import { addNotification } from '../../actions/notifications';
import { setCookie } from '../../js/cookies';
import { StyledRaisedButton } from '../../js/globalStyles';
import { Container, Content, Form, Header, ButtonContainer, Recovery, Bottom, BottomText } from './SignIn_styles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class SignIn extends PureComponent {
  onSubmit = (values) => {
    axios.post(`${__ROOT_URL__}api/user/login`, values)
      .then((res) => {
        setCookie('token', res.data.token);
        this.props.history.push('/inicjatywy/edit');
        this.props.addNotification('Zalogowano', 'Zostałeś zalogowany', 'success');
      }, (err) => {
        this.props.addNotification('Wystąpił błąd', err.response.data.message, 'error');
      });
  }

  pushToRecovery = () => {
    this.props.history.push('/odzyskiwanie_hasla');
  }

  pushToRegistration = () => {
    this.props.history.push('/rejestracja');
  }

  renderTextField(name, label, type) {
    return (
      <Field
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
      <Container>
        <Content>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Header>Logowanie</Header>
            {this.renderTextField('email', 'E-mail', 'text')}
            {this.renderTextField('password', 'Hasło', 'password')}
            <ButtonContainer>
              <StyledRaisedButton
                label="Zaloguj się"
                type="submit"
                primary
              />
            </ButtonContainer>
            <Recovery onClick={this.pushToRecovery}>Zapomniałem hasła</Recovery>
          </Form>
          <Bottom>
            <BottomText>Nie posiadasz jeszcze konta?</BottomText>
            <FlatButton
              label="Zarejestruj się"
              labelStyle={{ color: '#fff' }}
              onTouchTap={this.pushToRegistration}
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

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNotification }, dispatch);
}

export default reduxForm({
  validate,
  form: 'SignInForm',
})(connect(null, mapDispatchToProps)(SignIn));
