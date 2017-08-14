import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick, omit } from 'lodash';
import ProfileHeader from '../../modules/ProfileHeader/ProfileHeader';
import SimpleText from '../../modules/SimpleText/SimpleText';
import ProjectsTiles from '../../modules/ProjectsTiles/ProjectsTiles';
import './publicProfile.scss';

class PublicProfile extends Component {
  renderModule = (module, colors) => {
    let newComponent;
    switch (module.kind) {
      case 'SimpleText': newComponent = <SimpleText {...module} />; break;
      case 'ProjectsTiles': newComponent = <ProjectsTiles {...module} mainColors={colors} />; break;
      default: newComponent = null;
    }
    return (
      <div className="publicProfile__wrapper" key={module._id}>
        {newComponent}
      </div>
    );
  }

  render() {
    const header = omit(this.props.activeCircle, 'modules');
    const modules = pick(this.props.activeCircle, 'modules');

    return (
      <div className="publicProfile__container">
        <div className="body__container">
          <ProfileHeader {...header} />
          {
            modules.modules.map(module => this.renderModule(module, header.colors))
          }
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
