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
import EditSidebar from '../../components/EditSidebar/EditSidebar';
import CardEditDialog from '../../dialogs/CardEditDialog/CardEditDialog';
import SocialsDialog from '../../dialogs/SocialsDialog/SocialsDialog';
import ImageDialog from '../../dialogs/ImageDialog/ImageDialog';
import SimpleTextDialog from '../../dialogs/SimpleTextDialog/SimpleTextDialog';
import LinkImagesDialog from '../../dialogs/LinkImagesDialog/LinkImagesDialog';
import NumbersDialog from '../../dialogs/NumbersDialog/NumbersDialog';
import CollapsibleDialog from '../../dialogs/CollapsibleDialog/CollapsibleDialog';
import { getActiveCircle, changeLogo } from '../../actions/circles';
import { MainContainer } from '../../js/globalStyles';
import { Container, Wrapper } from './EditProfile_styles';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: null,
      dialogData: {},
      sidebar: true,
      mode: 'Moduły', // Moduły, Dodaj moduł, Edycja modułu, Dodawanie modułu
      editingModule: null,
      modalFunctions: {
        submit: null,
        cancel: null,
        remove: null,
        changeColors: null,
      },
    };
  }

  componentWillMount() {
    this.props.getActiveCircle();
  }

  setModalFunctions = (modalFunctions) => {
    this.setState({ modalFunctions });
  }

  openDialog = (name, data) => {
    this.setState({ dialog: name, dialogData: data });
  }

  closeDialog = () => {
    const mode = this.state.mode === 'Dodawanie modułu' ? 'Dodaj moduł' : 'Moduły';
    this.setState({
      dialog: null,
      editingModule: null,
      mode,
      modalFunctions: {
        submit: null,
        cancel: null,
        remove: null,
        changeColors: null,
      },
    });
  }

  changeSocials = (value) => {
    this.closeDialog();
  }

  changeLogo = (value) => {
    console.log(value);
    this.props.changeLogo(value);
    this.closeDialog();
  }

  changeBackground = (value) => {
    console.log(value);
    this.closeDialog();
  }

  renderModule = (module, colors, index) => {
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
      <Wrapper key={index}>{newComponent}</Wrapper>
    );
  }

  render() {
    if (this.props.activeCircle._id) {
      const { dialog, sidebar, mode, dialogData, modalFunctions, editingModule } = this.state;
      const { activeCircle } = this.props;
      const header = omit(activeCircle, 'modules');
      const modules = pick(activeCircle, 'modules');
      const EditSidebarData = { sidebar, mode, editingModule, modalFunctions };
      const moduleData = {
        sidebar,
        open: true,
        closeDialog: this.closeDialog,
        data: dialogData,
        setModalFunctions: this.setModalFunctions,
        colors: this.props.activeCircle.colors,
      };

      return (
        <Container>
          <EditSidebar
            openDialog={this.openDialog}
            changeContent={(state) => { this.setState(state); }}
            toggleSidebar={() => { this.setState({ sidebar: !sidebar }); }}
            {...EditSidebarData}
            {...activeCircle}
          />
          <MainContainer>
            <ProfileHeader
              openDialog={this.openDialog}
              closeDialog={this.closeDialog}
              editable
              {...header}
            />
            {(modules.modules) &&
              modules.modules.map((module, index) =>
                this.renderModule(module, header.colors, index))
            }
          </MainContainer>
          {(dialog === 'card') &&
          <CardEditDialog
            fetchCircle={this.props.getActiveCircle}
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
              maxSize={100000}
              title="Edytuj logo"
              {...moduleData}
            />
          }
          {dialog === 'background' &&
            <ImageDialog
              submitFunction={this.changeBackground}
              width={1920}
              height={540}
              maxSize={200000}
              title="Edytuj zdjęcie w tle"
              {...moduleData}
            />
          }
          {dialog === 'SimpleText' && <SimpleTextDialog {...moduleData} />}
          {dialog === 'LinkImages' && <LinkImagesDialog {...moduleData} />}
          {dialog === 'Collapsible' && <CollapsibleDialog {...moduleData} />}
          {dialog === 'Numbers' && <NumbersDialog {...moduleData} />}
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
  return bindActionCreators({ getActiveCircle, changeLogo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
