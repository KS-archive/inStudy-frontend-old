import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
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
import { getPublicCircle } from '../../actions/circles';
import './publicProfile.scss';

class PublicProfile extends Component {
  componentWillMount() {
    this.props.getPublicCircle(this.props.match.params.url);
  }

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
      <div className="publicProfile__wrapper" key={module._id}>
        {newComponent}
      </div>
    );
  }

  render() {
    if (this.props.publicCircle._id) {
      const header = omit(this.props.publicCircle, 'modules');
      const modules = pick(this.props.publicCircle, 'modules');
      return (
        <div className="publicProfile__container">
          <div className="body__container">
            <ProfileHeader {...header} editable={false} />
            {(modules.modules) &&
              modules.modules.map(module => this.renderModule(module, header.colors))
            }
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    publicCircle: state.publicCircle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPublicCircle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);
