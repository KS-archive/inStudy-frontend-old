import React, { PureComponent } from 'react';
import HelmetHeader from './Header';
import { StyledRaisedButton } from '../../utils/globalStyles';
import { Container, Content, Header } from './ConfirmEmail_styles';

export default class ConfirmEmail extends PureComponent {
  render() {
    return (
      <Container>
        <HelmetHeader />
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
