import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import './publicProfile.scss';

class PublicProfile extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="publicProfile__container">
        <div className="body__container">
          <ProfileHeader {...this.props.activeCircle} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeCircle: state.activeCircle,
  };
}

export default connect(mapStateToProps)(PublicProfile);
