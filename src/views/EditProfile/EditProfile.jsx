import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import DocumentMeta from 'react-document-meta';
import ProfileHeader from '../../modules/ProfileHeader/ProfileHeader';
import EditSidebar from '../../components/EditSidebar/EditSidebar';
import modulesHandlers from './helpers/modulesHandlers';
import basicEditHandlers from './helpers/basicEditHandlers';
import renderHandlers from './helpers/renderHandlers';
import dialogHandlers from './helpers/dialogHandlers';
import renderDialog from './helpers/renderDialog';
import { addNotification } from '../../actions/notifications';
import { getActiveCircle, removeActiveCircle } from '../../actions/circles';
import { deleteCookie } from '../../utils/cookies';
import { addModule, updateModule, deleteModule } from '../../actions/modules';
import { changeLogo, changeBackground, changeCardData, changeSocials, reorderModules } from '../../actions/circleEdit';
import { MainContainer } from '../../utils/globalStyles';
import { Container } from './EditProfile_styles';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogData: {},
      sidebar: true,
      mode: 'Moduły', // Moduły, Dodaj moduł, Edycja modułu, Dodawanie modułu, Ustawienia
      modalFunctions: {},
    };
  }

  componentWillMount() {
    modulesHandlers(this);
    basicEditHandlers(this);
    renderHandlers(this);
    dialogHandlers(this);
    this.renderCircle();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      header: omit(nextProps.activeCircle, ['modules']),
      modules: pick(nextProps.activeCircle, ['modules']).modules,
    });
  }

  setModalFunctions = (id, submit, cancel, remove, changeColors, changeOrder) => {
    remove = id && remove;
    this.setState({ modalFunctions: { submit, cancel, remove, changeColors, changeOrder } });
  }

  logout = () => {
    deleteCookie('token');
    this.props.removeActiveCircle();
    this.props.history.push('/');
  }

  render() {
    if (this.props.activeCircle._id) {
      const { dialog, sidebar, mode, dialogData, modalFunctions, editingModule, header, modules } = this.state;
      const { activeCircle } = this.props;
      const EditSidebarData = { sidebar, mode, editingModule, modalFunctions };
      const moduleData = {
        sidebar,
        open: true,
        submit: this.submitModule,
        closeDialog: this.closeDialog,
        remove: this.deleteModule,
        data: dialogData,
        setModalFunctions: this.setModalFunctions,
        colors: this.props.activeCircle.colors,
      };
      const meta = {
        title: `Edytuj profil - ${activeCircle.name}`,
      };

      return (
        <Container>
          <DocumentMeta {...meta} />
          <EditSidebar
            openDialog={this.openDialog}
            closeDialog={this.closeDialog}
            changeContent={(state) => { this.setState(state); }}
            toggleSidebar={() => { this.setState({ sidebar: !sidebar }); }}
            changeOrder={(toReorder) => { this.openDialog('reorder', toReorder); }}
            logout={this.logout}
            {...EditSidebarData}
            {...activeCircle}
          />
          <MainContainer>
            {header &&
              <ProfileHeader
                openDialog={this.openDialog}
                closeDialog={this.closeDialog}
                editable
                {...header}
              />
            }
            {(modules) &&
              modules.map((module, index) =>
                this.renderModule(module, header.colors, index))
            }
          </MainContainer>
          {renderDialog(this, moduleData)}
          {(dialog) && this.renderModuleDialog(dialog, moduleData)}
        </Container>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    activeCircle: state.activeCircle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getActiveCircle, addModule, updateModule, deleteModule, changeLogo, changeBackground, changeCardData, changeSocials, addNotification, reorderModules, removeActiveCircle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
