import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { getCircles } from '../../actions/circles';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CircleCard from '../../components/CircleCard/CircleCard';
import { MainContainer } from '../../js/globalStyles';
import './circles.scss';

class Circles extends Component {
  componentDidMount() {
    this.props.getCircles(0, 10);
  }

  render() {
    console.log(this.props.circles);
    return (
      <div className="circles__container">
        <MainContainer>
          <SearchBar />
          <div className="circles__searchFilters">
            <SearchFilters />
          </div>
          <div className="circles__circlesList">
            {
              this.props.circles.map(circle => <CircleCard key={circle._id} onClick={() => { this.props.history.push(`/inicjatywy/${circle.url}`); }} {...circle} />)
            }
          </div>
        </MainContainer>
      </div>
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
