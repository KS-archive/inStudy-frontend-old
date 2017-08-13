import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CircleCard from '../../components/CircleCard/CircleCard';
import './circles.scss';

export default class Circles extends Component {
  render() {
    return (
      <div className="circles__container">
        <div className="body__container">
          <SearchBar />
          <div className="circles__searchFilters">
            <SearchFilters />
          </div>
          <div className="circles__circlesList">
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
            <CircleCard />
          </div>
        </div>
      </div>
    );
  }
}
