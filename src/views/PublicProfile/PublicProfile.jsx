import React, { PureComponent } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import Header from './Header';
import accessibleModules from '../../utils/constants/accesibleModules';
import ProfileHeader from '../../modules/ProfileHeader/ProfileHeader';
import { getPublicCircle, removePublicCircle } from '../../actions/circles';
import { MainContainer } from '../../utils/globalStyles';
import { Container, Wrapper } from './PublicProfile_styles';

class PublicProfile extends PureComponent {
  componentDidMount() {
    this.props.getPublicCircle(this.props.match.params.url);
  }

  componentWillUnmount() {
    this.props.removePublicCircle();
  }

  renderModule = (module, colors) => {
    const ModuleComponent = accessibleModules.find(el => el.kind === module.kind).component;
    return (
      <Wrapper key={module.id}>
        <ModuleComponent {...module} mainColors={colors} />
      </Wrapper>
    );
  }

  render() {
    const { publicCircle } = this.props;
    const meta = {
      title: `${publicCircle.name} - inStudy`,
      description: `Profil ${publicCircle.name} na portalu inStudy`,
      ogImage: publicCircle.og
        ? `${__ROOT_URL__}img/upload/${publicCircle.og}`
        : 'https://instudy.pl/img/Facebook-Open-Graph.jpg',
      url: this.props.location.href,
    };

    if (publicCircle._id) {
      const header = omit(publicCircle, ['modules']);
      const modules = pick(publicCircle, ['modules']).modules;
      return (
        <Container>
          <Header {...meta} />
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
  return bindActionCreators({ getPublicCircle, removePublicCircle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);
