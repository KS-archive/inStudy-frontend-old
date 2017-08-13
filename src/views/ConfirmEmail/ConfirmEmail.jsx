import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './confirmEmail.scss';

export default class ConfirmEmail extends Component {
  render() {
    return (
      <div className="confirmEmail__container">
        <div className="confirmEmail__content">
          <p className="confirmEmail__header">Adres e-mail został potwierdzony. Możesz się zalogować</p>
          <RaisedButton
            label="Zaloguj się"
            labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
            onTouchTap={() => { this.props.history.push('/logowanie'); }}
            secondary
          />
        </div>
      </div>
    );
  }
}
