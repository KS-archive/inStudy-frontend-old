import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { detectIE } from '../../js/utils';
import { Container, Content, Logo, Text, Buttons, StyledRaisedButton } from './Hero_styles';

class Hero extends Component {
  render() {
    return (
      <Container isIE={detectIE()}>
        <Content>
          <Logo src="./img/logo-instudy-rectangle.png" alt="Logo inStudy" />
          <Text>Więcej niż studia!</Text>
          <Buttons>
            <StyledRaisedButton
              label="Odkryj inicjatywy"
              onClick={() => { this.props.history.push('/inicjatywy'); }}
            />
            <StyledRaisedButton
              label="Załóż konto"
              onClick={() => { this.props.history.push('/rejestracja'); }}
            />
          </Buttons>
        </Content>
      </Container>
    );
  }
}

export default muiThemeable()(Hero);
