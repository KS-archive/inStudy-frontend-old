import React, { Component } from 'react';
import './collapsibleElement.scss';

export default class Collapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    console.log(this.props);
    return (
      <div className="collapsible__element" key={this.props.title}>
        <h2 className="collapsible__title" style={{ backgroundColor: this.props.color }} onClick={() => { this.setState({ open: !this.state.open }); }}>{this.props.title}</h2>
        <div className={`collapsible__descriptionContainer ${this.state.open && 'active'}`} style={{ borderColor: this.props.color }}>
          <p className="collapsible__description">{this.props.description}</p>
        </div>
      </div>
    );
  }
}
