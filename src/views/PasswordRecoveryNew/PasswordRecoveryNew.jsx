import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import TextField from 'redux-form-material-ui/lib/TextField';
import { StyledRaisedButton } from '../../js/globalStyles';
import { Container, Content, Form, Header, ButtonContainer } from './PasswordRecoveryNew_styles';

const required = value => (value == null ? 'To pole jest wymagane' : undefined);

class PasswordRecoveryNew extends Component {
  onSubmit = (values) => {
    console.log(values);
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

export default reduxForm({
  validate,
  form: 'PasswordRecoveryNewForm',
})(PasswordRecoveryNew);
