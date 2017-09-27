import React, { Component } from 'react';

export default class Instruction extends Component {
  componentDidMount() {
    window.location.replace(`${__ROOT_URL__}files/instrukcja.pdf`);
  }

  render() {
    return (
      <div />
    );
  }
}
