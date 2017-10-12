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
      showLoader: true,
      showCircles: true,
      query: this.props.query || '',
      filters: this.props.filters || {},
    };

    this.page = 0;
    this.limit = 10;
    this.isMore = true;
    this.checkIsBottom = true;
  }

  componentWillMount() {
    const circlesLength = this.props.circles.length;
    if (this.props.circles && circlesLength === 0) {
      this.updateCircles();
    } else {
      if (circlesLength % this.limit !== 0) {
        this.isMore = false;
        this.checkIsBottom = false;
      }
      this.setState({ showLoader: false });
    }
  }

  componentDidMount() {
    this.container = document.getElementById('appContainer');
    this.container.addEventListener('scroll', this.isBottom);
  }

  componentWillReceiveProps(nextProps) {
    const { filters, query } = nextProps;
    if (!isEqual(filters, this.props.filters) || query !== this.props.query) {
      this.page = 0;
      this.isMore = true;
      this.checkIsBottom = true;
      this.setState({
        query: query || '',
        showLoader: true,
        showCircles: false,
        filters: filters || {},
      }, () => { this.updateCircles(false); });
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.isBottom);
  }

  isBottom = () => {
    const isBottom = window.innerHeight + this.container.scrollTop >= this.wrapper.offsetHeight;
    if (isBottom && this.isMore && this.checkIsBottom) {
      this.checkIsBottom = false;
      this.setState({ showLoader: true });
      this.updateCircles(true);
    }
  }

  redirectToCircleView = (url, button) => {
    if (button === 0) {
      this.props.history.push(`/inicjatywy/${url}`);
    } else {
      window.open(`${__ROOT_URL__}inicjatywy/${url}`, '_blank');
    }
  }

  updateCircles = (extend) => {
    const { page, limit } = this;
    const { query, filters } = this.state;
    this.props.getCircles(page, limit, query, filters, this, extend);
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
      <ContentWrapper innerRef={(wrapper) => { this.wrapper = wrapper; }}>
        <Header />
        <MainContainer>
          <SearchBar />
          <SearchFiltersContainer>
            <SearchFilters />
          </SearchFiltersContainer>
          <CirclesList>
            {(circles.length !== 0 && this.state.showCircles) &&
              circles.map(circle => this.renderCircleCard(circle))}
            {this.state.showLoader && <StyledCircularProgress size={80} thickness={5} />}
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
