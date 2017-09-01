import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Filter from '../Filter/Filter';
import { deleteFilter } from '../../actions/filters';
import { Container, Wrapper, Filters, FilterLabel, RemoveFilters } from './SearchFilters_styles';
import { fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories } from '../../actions/helpers';

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
    const { open, filtersHeight, activeFilters } = this.state;
    const { cities, universities, types, categories, subcategories } = this.props.selectHelpers;
    return (
      <Container style={{ height: (open) ? filtersHeight : 20 }}>
        <Wrapper>
          <Filters>
            <Filter
              id={'cities'}
              label="Miasto"
              items={cities}
              changeHandler={(id) => { this.props.fetchUniversities(id); }}
            />
            <Filter
              id={'universities'}
              label="Uczelnia"
              items={universities}
              multiple
            />
            <Filter
              id={'types'}
              label="Typ aktywności"
              items={types}
              multiple
            />
            <Filter
              id={'categories'}
              label="Kategoria"
              items={categories}
              changeHandler={(id) => { this.props.fetchSubactegories(id); }}
            />
            <Filter
              id={'subcategories'}
              label="Podkategoria"
              items={subcategories}
              multiple
            />
            <RemoveFilters anyActive={activeFilters > 0} onClick={this.clearFilters}>
              Wyczyść filtry
            </RemoveFilters>
          </Filters>
          {(open) ?
            <FilterLabel onClick={() => { this.setState({ open: false }); }}>
              Ukryj filtry <ArrowDown />
            </FilterLabel>
            :
            <FilterLabel onClick={() => { this.setState({ open: true }); }}>
              Rozwiń filtry {(activeFilters > 0) && `(aktywne: ${activeFilters})` } <ArrowUp />
            </FilterLabel>
          }
        </Wrapper>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { filters, selectHelpers } = state;
  return { filters, selectHelpers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteFilter, fetchCities, fetchUniversities, fetchTypes, fetchCategories, fetchSubactegories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
