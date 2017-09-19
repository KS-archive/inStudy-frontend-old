import React, { Component } from 'react';
import { Container, Content, MainNumber, Description, Button } from './Error404_styles';

export default class Error404 extends Component {
  render() {
    return (
      <Container>
        <Content>
          <MainNumber>404</MainNumber>
          <Description>Strona o podanym adresie nie istnieje</Description>
          <Button
            label="Powrót na stronę główną"
            onClick={() => { this.props.history.push('/'); }}
          />
        </Content>
      </Container>
    );
  }
}
