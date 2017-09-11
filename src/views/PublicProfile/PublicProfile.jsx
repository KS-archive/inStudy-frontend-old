import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import accessibleModules from '../../js/constants/accesibleModules';
import ProfileHeader from '../../modules/ProfileHeader/ProfileHeader';
import { getPublicCircle } from '../../actions/circles';
import { MainContainer } from '../../js/globalStyles';
import { Container, Wrapper } from './PublicProfile_styles';

class PublicProfile extends Component {
  componentWillMount() {
    this.props.getPublicCircle(this.props.match.params.url);
  }

  renderModule = (module, colors) => {
    const ModuleComponent = accessibleModules.find(el => el.kind === module.kind).component;
    return (
      <Wrapper key={module._id}>
        <ModuleComponent {...module} mainColors={colors} />
      </Wrapper>
    );
  }

  render() {
    const { publicCircle } = this.props;
    if (publicCircle._id) {
      const header = omit(publicCircle, ['modules']);
      const modules = pick(publicCircle, ['modules']).modules;
      return (
        <Container>
          <MainContainer>
            <ProfileHeader {...header} editable={false} />
            {(modules) &&
              modules.map(module => this.renderModule(module, header.colors))
            }
          </MainContainer>
        </Container>
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
