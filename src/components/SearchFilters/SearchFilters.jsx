import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { deleteFilter } from '../../actions/filters';
import { fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories } from '../../actions/helpers';

import Filter from '../Filter/Filter';
import './searchFilters.scss';

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeFilters: 0,
      filtersHeight: 221,
    };
  }

  componentDidMount() {
    this.props.fetchCities();
    this.props.fetchTypes();
    this.props.fetchCategories();
    window.addEventListener('resize', this.setFiltersHeight);
    this.setFiltersHeight();
  }

  componentWillReceiveProps(nextProps) {
    let activeFilters = 0;
    console.log(nextProps.filters);
    const filters = nextProps.filters;
    Object.keys(filters).forEach((key) => {
      if ((Array.isArray(filters) && filters[key].length > 0) || !Array.isArray(filters)) activeFilters += 1;
    });
    this.setState({ activeFilters });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setFiltersHeight);
  }

  setFiltersHeight = () => {
    const width = window.innerWidth;
    let filtersHeight = 221;
    if (width <= 960) filtersHeight = 313;
    if (width <= 674) filtersHeight = 560;
    if (this.state.filtersHeight !== filtersHeight) {
      this.setState({ filtersHeight });
    }
  }

  clearFilters = () => {
    const obj = this.props.filters;
    Object.keys(obj).forEach((key) => {
      this.props.deleteFilter(key);
    });
  }

  render() {
    const activeFilters = this.state.activeFilters;
    return (
      <div className="searchFilters__wraper" style={{ height: (this.state.open) ? this.state.filtersHeight : 20 }}>
        <div className="searchFilters__container">
          <div className={'searchFilters__filters'}>
            <Filter
              id={'cities'}
              label="Miasto"
              items={this.props.selectHelpers.cities}
              changeHandler={(id) => { this.props.fetchUniversities(id); }}
            />
            <Filter
              id={'universities'}
              label="Uczelnia"
              items={this.props.selectHelpers.universities}
              multiple
            />
            <Filter
              id={'types'}
              label="Typ aktywności"
              items={this.props.selectHelpers.types}
              multiple
            />
            <Filter
              id={'categories'}
              label="Kategoria"
              items={this.props.selectHelpers.categories}
              changeHandler={(id) => { this.props.fetchSubactegories(id); }}
            />
            <Filter
              id={'subcategories'}
              label="Podkategoria"
              items={this.props.selectHelpers.subcategories}
              multiple
            />
            <div className={`seatchFilters__remove ${(activeFilters > 0) && 'active'}`} onClick={this.clearFilters}>Wyczyść filtry</div>
          </div>
          {
            (this.state.open)
              ? <p
                className="searchFilters__label"
                onClick={() => { this.setState({ open: false }); }}
              >
                Ukryj filtry <ArrowDown />
              </p>
              : <p
                className="searchFilters__label"
                onClick={() => { this.setState({ open: true }); }}
              >
                Rozwiń filtry {(activeFilters > 0) && `(aktywne: ${activeFilters})` } <ArrowUp />
              </p>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters,
    selectHelpers: state.selectHelpers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteFilter, fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
