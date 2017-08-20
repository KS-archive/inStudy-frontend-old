import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { detectIE } from '../../js/utils';
import './hero.scss';

class Hero extends Component {
  render() {
    const heroContainerStyle = {
      backgroundColor: (detectIE()) ? this.props.muiTheme.palette.primary2Color : null,
    };
    return (
      <div className="hero__container" style={heroContainerStyle}>
        <div className="hero__content">
          <img className="hero__logo" src="./img/logo-instudy-rectangle.png" alt="Logo inStudy" />
          <h1 className="hero__text">Więcej niż studia!</h1>
          <div className="hero__buttons">
            <RaisedButton
              className="hero__button"
              label="Odkryj inicjatywy"
              labelColor={this.props.muiTheme.palette.primary2Color}
              labelStyle={{ fontSize: 16 }}
              style={{ marginRight: 20 }}
              onClick={() => { this.props.history.push('/inicjatywy'); }}
            />
            <RaisedButton
              className="hero__button"
              label="O projekcie"
              labelColor="#fff"
              labelStyle={{ fontSize: 16 }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              style={{ backgroundColor: 'transparent', border: '1px solid #fff', boxShadow: 'none' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default muiThemeable()(Hero);
