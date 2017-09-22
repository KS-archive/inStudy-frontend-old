import React, { PureComponent } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import axios from 'axios';
import TextField from 'redux-form-material-ui/lib/TextField';
import DocumentMeta from 'react-document-meta';
import { addNotification } from '../../actions/notifications';
import { StyledRaisedButton } from '../../utils/globalStyles';
import { Container, Content, Form, Header, ButtonContainer } from './PasswordRecovery_styles';

class PasswordRecovery extends PureComponent {
  onSubmit = (values) => {
    const url = `${__ROOT_URL__}api/mail/recover/${values.email}`;
    axios.post(url, null).then(
      () => {
        this.props.addNotification('Wysłano!', 'Na podany adres e-mail właśnie wysłaliśmy wiadomość z linkiem do odzyskiwania hasła', 'success');
        this.props.history.push('/');
      },
      (err) => {
        this.props.addNotification('Wystąpił błąd', err.response.data.message, 'error');
      },
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const meta = {
      title: 'inStudy - odzyskiwanie hasła',
    };

    return (
      <Container>
        <DocumentMeta {...meta} />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNotification }, dispatch);
}

export default reduxForm({
  validate,
  form: 'PasswordRecoveryForm',
})(connect(null, mapDispatchToProps)(PasswordRecovery));
