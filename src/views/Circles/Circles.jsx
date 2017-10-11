import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import isEqual from 'lodash/isEqual';
import Header from './Header';
import { getCircles } from '../../actions/circles';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CircleCard from '../../components/CircleCard/CircleCard';
import { MainContainer } from '../../utils/globalStyles';
import { ContentWrapper, SearchFiltersContainer, CirclesList, StyledCircularProgress } from './Circles_styles';

class Circles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      limit: 100,
      query: this.props.query || '',
      filters: this.props.filters || {},
    };
  }

  componentDidMount() {
    if (this.props.circles && this.props.circles.length === 0) {
      this.updateCircles();
    }
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

  redirectToCircleView = (url, button) => {
    if (button === 0) {
      this.props.history.push(`/inicjatywy/${url}`);
    } else {
      window.open(`${__ROOT_URL__}inicjatywy/${url}`, '_blank');
    }
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
        handleClick={(button) => { this.redirectToCircleView(url, button); }}
        {...circle}
      />
    );
  }

  render() {
    const { circles } = this.props;

    return (
      <ContentWrapper>
        <Header />
        <MainContainer>
          <SearchBar />
          <SearchFiltersContainer>
            <SearchFilters />
          </SearchFiltersContainer>
          <CirclesList>
            {(circles.length === 0)
              ? <StyledCircularProgress size={80} thickness={5} />
              // : circles.map(circle => this.renderCircleCard(circle))
              : <StyledCircularProgress size={80} thickness={5} />
            }
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
