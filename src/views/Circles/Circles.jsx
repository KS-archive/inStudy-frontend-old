import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CircleCard from '../../components/CircleCard/CircleCard';
import './circles.scss';

class Circles extends Component {
  render() {
    return (
      <div className="circles__container">
        <div className="body__container">
          <SearchBar />
          <div className="circles__searchFilters">
            <SearchFilters />
          </div>
          <div className="circles__circlesList">
            {
              this.props.circles.map(circle => <CircleCard key={circle._id} {...circle} />)
            }
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps)(Circles);
