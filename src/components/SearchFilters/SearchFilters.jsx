import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { deleteFilter } from '../../actions/filters';
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
    window.addEventListener('resize', this.setFiltersHeight);
    this.setFiltersHeight();
  }

  componentWillReceiveProps(nextProps) {
    let activeFilters = 0;
    const filters = nextProps.filters;
    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) activeFilters += 1;
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
            <Filter id={'cities'} label="Miasto" items={this.props.selectHelpers.cities} />
            <Filter id={'universities'} label="Uczelnia" items={this.props.selectHelpers.universities} multiple />
            <Filter id={'types'} label="Typ aktywności" items={this.props.selectHelpers.types} multiple />
            <Filter id={'categories'} label="Kategoria" items={this.props.selectHelpers.categories} />
            <Filter id={'subcategories'} label="Podkategoria" items={this.props.selectHelpers.subcategories} multiple />
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
  return bindActionCreators({ deleteFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
