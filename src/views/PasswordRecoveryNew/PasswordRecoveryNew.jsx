import React, { PureComponent } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import axios from 'axios';
import TextField from 'redux-form-material-ui/lib/TextField';
import HelmetHeader from './Header';
import { addNotification } from '../../actions/notifications';
import { StyledRaisedButton } from '../../utils/globalStyles';
import { Container, Content, Form, Header, ButtonContainer } from './PasswordRecoveryNew_styles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class PasswordRecoveryNew extends PureComponent {
  onSubmit = (values) => {
    const url = `${__ROOT_URL__}api/user/recoverypassword`;
    const data = {
      token: this.props.match.params.token,
      newpassword: values.password,
    };
    axios.post(url, data).then(
      () => {
        this.props.addNotification('Zmieniono!', 'Twoje hasło zostało zmienione.', 'success');
        this.props.history.push('/logowanie');
      },
      (err) => {
        this.props.addNotification('Wystąpił błąd', err.response.data.message, 'error');
      },
    );
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
        <HelmetHeader />
        <Content>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Header>Utwórz nowe hasło</Header>
            {this.renderTextField('password', 'Hasło', 'password')}
            {this.renderTextField('password2', 'Powtórz hasło', 'password')}
            <ButtonContainer>
              <StyledRaisedButton
                label="Zmień hasło"
                type="submit"
                primary
              />
            </ButtonContainer>
          </Form>
        </Content>
      </Container>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNotification }, dispatch);
}

export default reduxForm({
  validate,
  form: 'PasswordRecoveryNewForm',
})(connect(null, mapDispatchToProps)(PasswordRecoveryNew));
