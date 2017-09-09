import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ImageDialog from '../../ImageDialog/ImageDialog';
import SocialsDialog from '../../SocialsDialog/SocialsDialog';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container, ImagePreview, ImagePreviewOverlay, MediaWrapper, MediaElement, LabelHeader, AddSocial } from './MemberDetailsDialog_styles';

export default class MemberDetailsDialog extends Component {
  constructor(props) {
    super(props);
    const { coverImage, description, firstname, surname, role, socials } = this.props.data;
    this.state = {
      preview: coverImage && (coverImage.preview || coverImage),
      firstname: firstname || '',
      surname: surname || '',
      role: role || '',
      description: description || '',
      socials: socials || [],
      coverImage,
      dialog: false,
      errors: {
        name: null,
        link: null,
      },
    };
  }

  modifyImage = (value) => {
    const { image } = value;
    this.closeDialog();
    if (image) {
      this.setState({ src: image[0], preview: image[0].preview });
    }
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  submit = () => {
    const { data } = this.props;
    const { name, src, link } = this.state;
    const index = data && data.index;
    const values = { index, name, src, link };
    this.props.submit(values);
  }

  updateSocials = (socials) => {
    this.setState({ socials });
  }

  renderSocial = (social) => {
    console.log(social);
  }

  render() {
    const { closeDialog, sidebar } = this.props;
    const { preview, firstname, surname, role, description, socials, coverImage, dialog, errors } = this.state;
    const actions = [
      <FlatButton
        label="Anuluj"
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.submit}
        primary
      />,
    ];
    const imagePreview = preview || '';
    console.log(this.props);

    return (
      <EditDialog
        open
        onRequestClose={closeDialog}
        actions={actions}
        title="Edytuj element galerii"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <TextField
            value={firstname}
            onChange={(e) => { this.setState({ firstname: e.target.value }); }}
            floatingLabelText="Imię"
            errorText={errors.firstname}
            fullWidth
            {...inputStyle}
          />
          <TextField
            value={surname}
            onChange={(e) => { this.setState({ surname: e.target.value }); }}
            floatingLabelText="Nazwisko"
            errorText={errors.surname}
            fullWidth
            {...inputStyle}
          />
          <TextField
            value={role}
            onChange={(e) => { this.setState({ role: e.target.value }); }}
            floatingLabelText="Rola"
            errorText={errors.role}
            fullWidth
            {...inputStyle}
          />
          <TextField
            value={description}
            onChange={(e) => { this.setState({ description: e.target.value }); }}
            floatingLabelText="Opis"
            errorText={errors.description}
            fullWidth
            multiLine
            rows={1}
            {...inputStyle}
          />
          <MediaWrapper>
            <MediaElement>
              <LabelHeader>Zdjęcie</LabelHeader>
              <ImagePreview preview={preview}>
                <img src={imagePreview} alt="Podgląd obrazu" />
                <ImagePreviewOverlay onClick={() => { this.setState({ dialog: 'image' }); }}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                </ImagePreviewOverlay>
              </ImagePreview>
            </MediaElement>
            <MediaElement>
              <LabelHeader>Social media</LabelHeader>
              {socials.map(social => this.renderSocial(social))}
              <AddSocial onClick={() => { this.setState({ dialog: 'socials' }); }}>
                <i className="fa fa-plus" aria-hidden="true" />
              </AddSocial>
            </MediaElement>
          </MediaWrapper>
        </Container>
        {(dialog === 'image') &&
          <ImageDialog
            open
            submitFunction={this.modifyImage}
            closeDialog={this.closeDialog}
            width={265}
            height={265}
            maxSize={200000}
            title="Modyfikuj zdjęcie"
            data={coverImage.preview || coverImage}
            sidebar={sidebar}
          />
        }
        {(dialog === 'socials') &&
          <SocialsDialog
            open
            submitFunction={this.updateSocials}
            closeDialog={this.closeDialog}
            data={socials}
          />
        }
      </EditDialog>
    );
  }
}

MemberDetailsDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    coverImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.string,
    firstname: PropTypes.string,
    surname: PropTypes.string,
    _id: PropTypes.string,
    role: PropTypes.string,
    socials: PropTypes.array,
  }).isRequired,
};
