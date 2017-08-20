import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import ProfileHeader from '../../modules/ProfileHeader/ProfileHeader';
import SimpleText from '../../modules/SimpleText/SimpleText';
import ProjectsTiles from '../../modules/ProjectsTiles/ProjectsTiles';
import IconText from '../../modules/IconText/IconText';
import Numbers from '../../modules/Numbers/Numbers';
import Collapsible from '../../modules/Collapsible/Collapsible';
import LinkImages from '../../modules/LinkImages/LinkImages';
import MembersTiles from '../../modules/MembersTiles/MembersTiles';
import './editProfile.scss';

class PublicProfile extends Component {
  renderModule = (module, colors) => {
    let newComponent;
    switch (module.kind) {
      case 'SimpleText': newComponent = <SimpleText {...module} />; break;
      case 'ProjectsTiles': newComponent = <ProjectsTiles {...module} mainColors={colors} />; break;
      case 'IconText': newComponent = <IconText {...module} mainColors={colors} />; break;
      case 'Numbers': newComponent = <Numbers {...module} mainColors={colors} />; break;
      case 'Collapsible': newComponent = <Collapsible {...module} mainColors={colors} />; break;
      case 'MembersTiles': newComponent = <MembersTiles {...module} mainColors={colors} />; break;
      case 'LinkImages': newComponent = <LinkImages {...module} mainColors={colors} />; break;
      default: newComponent = null;
    }
    return (
      <div className="editProfile__wrapper" key={module._id}>
        {newComponent}
      </div>
    );
  }

  render() {
    const header = omit(this.props.activeCircle, 'modules');
    const modules = pick(this.props.activeCircle, 'modules');

    return (
      <div className="editProfile__container">
        <div className="body__container">
          <ProfileHeader {...header} editable />
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
