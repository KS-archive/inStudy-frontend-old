import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import './circleCard.scss';

class CircleCard extends Component {
  render() {
    const category = this.props.constElements.categories[this.props.circles[0].category];
    const subcategory = this.props.subcategories[this.props.circles[0].subcategory];
    return (
      <Paper className="circleCard__container" zDepth={2}>
        <div className="circleCard__logoContainer">
          <img src={this.props.circles[0].logo} alt={`${this.props.circles[0].name} - logo`} className="circleCard__logo" />
        </div>
        <h3 className="circleCard__name">{this.props.circles[0].name}</h3>
        <p className="circleCard__category">{`${category}, ${subcategory}`}</p>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    circles: state.circles,
    constElements: state.constElements,
    universities: state.universities,
    subcategories: state.subcategories,
  };
}

export default connect(mapStateToProps)(CircleCard);
