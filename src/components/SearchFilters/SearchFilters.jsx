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
      open: true,
      activeFilters: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    let activeFilters = 0;
    const filters = nextProps.filters;
    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) activeFilters += 1;
    });
    this.setState({ activeFilters });
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
      <div className="searchFilters__wraper" style={{ height: (this.state.open) ? 221 : 20 }}>
        <div className="searchFilters__container">
          <div className={'searchFilters__filters'}>
            <Filter id={'cities'} label="Miasto" items={this.props.constElements.cities} />
            <Filter id={'universities'} label="Uczelnia" items={this.props.universities} />
            <Filter id={'types'} label="Typ aktywności" items={this.props.constElements.types} />
            <Filter id={'categories'} label="Kategoria" items={this.props.constElements.categories} />
            <Filter id={'subcategories'} label="Podkategoria" items={this.props.subcategories} />
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
    constElements: state.constElements,
    universities: state.universities,
    subcategories: state.subcategories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
