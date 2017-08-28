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
import { getActiveCircle, changeLogo } from '../../actions/circles';
import './editProfile.scss';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: null,
      dialogData: {},
      sidebar: true,
    };
  }

  componentWillMount() {
    this.props.getActiveCircle();
  }

  openDialog = (name, data) => {
    this.setState({ dialog: name, dialogData: data });
  }

  closeDialog = () => {
    this.setState({ dialog: null });
  }

  changeSocials = (value) => {
    this.closeDialog();
  }

  changeLogo = (value) => {
    this.props.changeLogo(value);
    this.closeDialog();
  }

  changeBackground = (value) => {
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
      <div className="editProfile__wrapper" key={index}>
        {newComponent}
      </div>
    );
  }

  render() {
    console.log(this.props);
    if (this.props.activeCircle._id) {
      const header = omit(this.props.activeCircle, 'modules');
      const modules = pick(this.props.activeCircle, 'modules');

      return (
        <div className="editProfile__container">
          <EditSidebar
            sidebar={this.state.sidebar}
            toggleSidebar={() => { this.setState({ sidebar: !this.state.sidebar }); }}
            openDialog={this.openDialog}
            {...this.props.activeCircle}
          />
          <div className="body__container">
            <ProfileHeader
              openDialog={this.openDialog}
              closeDialog={this.closeDialog}
              editable
              {...header}
            />
            {(modules.modules) &&
              modules.modules.map((module, index) => this.renderModule(module, header.colors, index))
            }
          </div>
          <CardEditDialog
            closeDialog={this.closeDialog}
            open={this.state.dialog === 'card'}
            sidebar={this.state.sidebar}
            {...this.state.dialogData}
          />
          <SocialsDialog
            closeDialog={this.closeDialog}
            open={this.state.dialog === 'socials'}
            sidebar={this.state.sidebar}
            submitFunction={this.changeSocials}
            data={this.state.dialogData}
          />
          <ImageDialog
            closeDialog={this.closeDialog}
            open={this.state.dialog === 'logo'}
            sidebar={this.state.sidebar}
            submitFunction={this.changeLogo}
            width={310}
            height={310}
            maxSize={100000}
            title="Edytuj logo"
            data={this.state.dialogData}
          />
          <ImageDialog
            closeDialog={this.closeDialog}
            open={this.state.dialog === 'background'}
            sidebar={this.state.sidebar}
            submitFunction={this.changeBackground}
            width={1920}
            height={540}
            maxSize={200000}
            title="Edytuj zdjęcie w tle"
            data={this.state.dialogData}
          />
          <SimpleTextDialog
            closeDialog={this.closeDialog}
            open={this.state.dialog === 'SimpleText'}
            sidebar={this.state.sidebar}
            data={this.state.dialogData}
          />
        </div>
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
