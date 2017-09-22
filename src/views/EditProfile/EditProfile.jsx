import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import DocumentMeta from 'react-document-meta';
import accessibleModules from '../../js/constants/accesibleModules';
import ProfileHeader from '../../modules/ProfileHeader/ProfileHeader';
import EditSidebar from '../../components/EditSidebar/EditSidebar';
import CardEditDialog from '../../dialogs/CardEditDialog/CardEditDialog';
import SocialsDialog from '../../dialogs/SocialsDialog/SocialsDialog';
import ImageDialog from '../../dialogs/ImageDialog/ImageDialog';
import ReorderDialog from '../../dialogs/ReorderDialog/ReorderDialog';
import { addNotification } from '../../actions/notifications';
import { getActiveCircle, removeActiveCircle } from '../../actions/circles';
import { getCookie, deleteCookie } from '../../js/cookies';
import { addModule, updateModule, deleteModule } from '../../actions/modules';
import { changeLogo, changeBackground, changeCardData, changeSocials, reorderModules } from '../../actions/circleEdit';
import { MainContainer } from '../../js/globalStyles';
import { Container, Wrapper } from './EditProfile_styles';

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

  openDialog = (name, data) => {
    this.setState({ dialog: name, dialogData: data });
  }

  closeDialog = () => {
    this.setState({
      dialog: null,
      editingModule: null,
      mode: 'Moduły',
      modalFunctions: {
        submit: null,
        cancel: null,
        remove: null,
        changeColors: null,
        changeOrder: null,
      },
    });
  }

  submitModule = (values) => {
    const { addNotification } = this.props;
    const updateError = () => { addNotification('Wystąpił błąd', 'Moduł nie został zaktualizowany', 'error'); };
    const addError = () => { addNotification('Wystąpił błąd', 'Moduł nie został dodany', 'error'); };
    const updateSuccess = () => { addNotification('Zaktualizowano!', 'Moduł został zaktualizowany', 'success'); this.closeDialog(); };
    const addSuccess = () => { addNotification('Dodano!', 'Moduł został dodany', 'success'); this.closeDialog(); };

    if (values.id && typeof values.id === 'string') {
      this.props.updateModule(values, updateSuccess, updateError);
    } else {
      this.props.addModule(values, addSuccess, addError);
    }
  }

  deleteModule = (id) => {
    this.props.deleteModule(
      id,
      () => { this.props.addNotification('Usunięto!', 'Moduł został usunięty', 'success'); },
      () => { this.props.addNotification('Wystąpił błąd', 'Błąd podczas usuwania modułu', 'error'); },
    );
  }

  changeSocials = (values) => {
    this.props.changeSocials(
      values,
      () => { this.props.addNotification('Zaktualizowano!', 'Social media zostały zaktualizowane', 'success'); this.closeDialog(); },
      () => { this.props.addNotification('Wystąpił błąd', 'Social media nie zostały zmienione', 'error'); },
    );
  }

  changeLogo = (value) => {
    this.props.changeLogo(
      value.image[0],
      () => { this.props.addNotification('Zaktualizowano!', 'Logo zostało zaktualizowane', 'success'); this.closeDialog(); this.renderCircle(); },
      () => { this.props.addNotification('Wystąpił błąd', 'Logo nie zostało zmienione', 'error'); },
    );
  }

  changeBackground = (value) => {
    this.props.changeBackground(
      value.image[0],
      () => { this.props.addNotification('Zaktualizowano!', 'Zdjęcie w tle zostało zaktualizowane', 'success'); this.closeDialog(); this.renderCircle(); },
      () => { this.props.addNotification('Wystąpił błąd', 'Zdjęcie w tle nie zostało zmienione', 'error'); },
    );
  }

  reorderModules = (values) => {
    this.props.reorderModules(
      values,
      () => { this.props.addNotification('Zaktualizowano!', 'Kolejność modółów została zmieniona', 'success'); this.closeDialog(); },
      () => { this.props.addNotification('Wystąpił błąd', 'Kolejność modółów nie została zmieniona', 'error'); },
    );
  }

  renderCircle = () => {
    if (getCookie('token')) {
      this.props.getActiveCircle(() => {
        this.props.addNotification('Wylogowano', 'Zostałeś wylogowany ze względu na długi brak aktywności na koncie', 'info');
        this.logout();
      });
    } else {
      this.props.addNotification('Wystąpił błąd', 'Nie udało nam się odnaleźć Twojego konta. Spróbuj zalogować się ponownie', 'error');
      this.logout();
    }
  }

  renderModule = (module, colors) => {
    const ModuleComponent = accessibleModules.find(el => el.kind === module.kind).component;
    return (
      <Wrapper key={module.id}>
        <ModuleComponent {...module} mainColors={colors} />
      </Wrapper>
    );
  }

  renderDialog = (dialog, data) => {
    let DialogComponent = accessibleModules.find(el => el.kind === dialog);
    if (DialogComponent) {
      DialogComponent = DialogComponent.dialog;
      return <DialogComponent kind={dialog} {...data} />;
    }
    return null;
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
          {(dialog === 'card') &&
          <CardEditDialog
            renderCircle={this.renderCircle}
            {...dialogData}
            {...moduleData}
          />
          }
          {dialog === 'socials' && <SocialsDialog submitFunction={this.changeSocials} {...moduleData} />}
          {dialog === 'logo' &&
            <ImageDialog
              submitFunction={this.changeLogo}
              width={310}
              height={310}
              maxSize={200000}
              title="Edytuj logo"
              {...moduleData}
            />
          }
          {dialog === 'background' &&
            <ImageDialog
              submitFunction={this.changeBackground}
              width={1920}
              height={540}
              maxSize={400000}
              title="Edytuj zdjęcie w tle"
              {...moduleData}
            />
          }
          {dialog === 'reorder' &&
            <ReorderDialog
              submitFunction={this.reorderModules}
              closeDialog={this.closeDialog}
              title="Zmień kolejność modułów"
              data={modules}
              displayBy="title"
              sidebar
            />
          }
          {(dialog) && this.renderDialog(dialog, moduleData)}
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
