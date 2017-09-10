import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { getCircles } from '../../actions/circles';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CircleCard from '../../components/CircleCard/CircleCard';
import { MainContainer } from '../../js/globalStyles';
import { ContentWrapper, SearchFiltersContainer, CirclesList } from './Circles_styles';

class Circles extends Component {
  componentDidMount() {
    this.props.getCircles(0, 10);
  }

  redirectToCircleView = (url) => {
    this.props.history.push(`/inicjatywy/${url}`);
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCircles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Circles);
