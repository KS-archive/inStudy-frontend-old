import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { deleteFilter } from '../../actions/filters';
import Filter from '../Filter/Filter';
import { cities, universities, types, categories, subcategories } from '../../js/selectHelper';
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
            <Filter id={0} label="Miasto" items={cities} />
            <Filter id={1} label="Uczelnia" items={universities} />
            <Filter id={2} label="Typ aktywności" items={types} />
            <Filter id={3} label="Kategoria" items={categories} />
            <Filter id={4} label="Podkategoria" items={subcategories} />
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
