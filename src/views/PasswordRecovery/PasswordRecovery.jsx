import React, { PureComponent } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import TextField from 'redux-form-material-ui/lib/TextField';
import { StyledRaisedButton } from '../../js/globalStyles';
import { Container, Content, Form, Header, ButtonContainer } from './PasswordRecovery_styles';

class PasswordRecovery extends PureComponent {
  onSubmit = (values) => {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Content>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Header>Odzyskiwanie hasła</Header>
            <Field
              name="email"
              component={TextField}
              floatingLabelText="E-mail"
              floatingLabelFocusStyle={{ fontWeight: 500 }}
              floatingLabelShrinkStyle={{ fontWeight: 900 }}
              style={{ width: 350, fontWeight: 500 }}
            />
            <ButtonContainer>
              <StyledRaisedButton
                label="Wyślij"
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
