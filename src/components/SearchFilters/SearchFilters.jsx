import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { hasAnyValue } from '../../utils/utils';
import Filter from '../Filter/Filter';
import { deleteFilter } from '../../actions/filters';
import { cities, types, categories } from '../../utils/constants/filterData';
import { Container, Wrapper, Filters, FilterLabel, RemoveFilters } from './SearchFilters_styles';

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeFilters: 0,
      filtersHeight: 221,
      universities: null,
      subcategories: null,
    };
  }

  componentWillMount() {
    if (hasAnyValue(this.props.filters)) {
      const city = cities[this.props.filters.city];
      const category = categories[this.props.filters.category];
      this.setState({
        universities: city && city.universities,
        subcategories: category && category.subcategories,
      }, () => { this.setFilters(this.props.filters); });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setFiltersHeight);
    this.setFiltersHeight();
  }

  componentWillReceiveProps(nextProps) {
    this.setFilters(nextProps.filters);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setFiltersHeight);
  }

  setFilters = (filters, callback) => {
    let activeFilters = 0;
    if (hasAnyValue(filters)) {
      Object.keys(filters).forEach((key) => {
        const isArray = Array.isArray(filters[key]);
        activeFilters += ((isArray && filters[key].length > 0) || !isArray) ? 1 : 0;
      });
    }
    this.setState({ activeFilters }, callback);
  }

  setUniversities = (cityId) => {
    const universities = cities[cityId] && cities[cityId].universities;
    this.props.deleteFilter('university');
    this.setState({ universities });
  }

  setSubcategories = (categoryId) => {
    const subcategories = categories[categoryId] && categories[categoryId].subcategories;
    this.props.deleteFilter('subcategory');
    this.setState({ subcategories });
  }

  setFiltersHeight = () => {
    const width = window.innerWidth;
    let filtersHeight = 221;
    if (width <= 1200) filtersHeight = 313;
    if (width <= 700) filtersHeight = 560;
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

  renderFilter = (id, label, items, changeHandler, multiple = false) => {
    const attrs = { id, label, items, changeHandler, multiple };
    return <Filter {...attrs} />;
  };

  render() {
    const { open, filtersHeight, activeFilters, universities, subcategories } = this.state;
    return (
      <Container style={{ height: (open) ? filtersHeight : 20 }}>
        <Wrapper>
          <Filters>
            {this.renderFilter('city', 'Miasto', cities, (id) => { this.setUniversities(id); })}
            {this.renderFilter('university', 'Uczelnia', universities, null, true)}
            {this.renderFilter('type', 'Typ aktywności', types, null, true)}
            {this.renderFilter('category', 'Kategoria', categories, (id) => { this.setSubcategories(id); })}
            {this.renderFilter('subcategory', 'Podkategoria', subcategories, null, true)}
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
  const { filters } = state;
  return { filters };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
