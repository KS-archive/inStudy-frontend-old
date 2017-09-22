import React, { PureComponent } from 'react';
import DocumentMeta from 'react-document-meta';
import { StyledRaisedButton } from '../../js/globalStyles';
import { Container, Content, Header } from './ConfirmEmail_styles';

export default class ConfirmEmail extends PureComponent {
  render() {
    const meta = {
      title: 'inStudy - potwierdź e-mail',
    };

    return (
      <Container>
        <DocumentMeta {...meta} />
        <Content>
          <Header>Adres e-mail został potwierdzony. Możesz się zalogować</Header>
          <StyledRaisedButton
            label="Zaloguj się"
            onTouchTap={() => { this.props.history.push('/logowanie'); }}
            secondary
          />
        </Content>
      </Container>
    );
  }
}
