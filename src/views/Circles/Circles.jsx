import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import isEqual from 'lodash/isEqual';
import { getCircles } from '../../actions/circles';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CircleCard from '../../components/CircleCard/CircleCard';
import { MainContainer } from '../../js/globalStyles';
import { ContentWrapper, SearchFiltersContainer, CirclesList } from './Circles_styles';

class Circles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 5,
      query: this.props.query || '',
      filters: this.props.filters || {},
    };
  }

  componentDidMount() {
    this.updateCircles();
  }

  componentWillReceiveProps(nextProps) {
    const { filters, query } = nextProps;
    if (!isEqual(filters, this.props.filters) || query !== this.props.query) {
      this.setState({
        query: query || '',
        filters: filters || {},
      }, this.updateCircles);
    }
  }

  redirectToCircleView = (url) => {
    this.props.history.push(`/inicjatywy/${url}`);
  }

  updateCircles = () => {
    const { page, limit, query, filters } = this.state;
    this.props.getCircles(page, limit, query, filters);
  }

  renderCircleCard = (circle) => {
    const { _id, url } = circle;
    return (
      <CircleCard
        key={_id}
        handleClick={() => { this.redirectToCircleView(url); }}
        {...circle}
      />
    );
  }

  render() {
    return (
      <ContentWrapper>
        <MainContainer>
          <SearchBar />
          <SearchFiltersContainer>
            <SearchFilters />
          </SearchFiltersContainer>
          <CirclesList>
            {this.props.circles.map(circle => this.renderCircleCard(circle))}
          </CirclesList>
        </MainContainer>
      </ContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    circles: state.circles,
    query: state.query,
    filters: state.filters,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCircles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Circles);
