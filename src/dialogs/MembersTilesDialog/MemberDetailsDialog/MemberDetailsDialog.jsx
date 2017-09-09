import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import keys from 'lodash/keys';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import validation from '../../../js/validation';
import socialsList from '../../../js/constants/socials';
import ImageDialog from '../../ImageDialog/ImageDialog';
import SocialsDialog from '../../SocialsDialog/SocialsDialog';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container, ImagePreview, ImagePreviewOverlay, MediaWrapper, MediaElement, LabelHeader, SocialsWrapper, Social, AddSocial } from './MemberDetailsDialog_styles';

export default class MemberDetailsDialog extends Component {
  constructor(props) {
    super(props);
    const { coverImage, description, firstname, surname, role, socials, index } = this.props.data;
    this.state = {
      index,
      preview: coverImage && (coverImage.preview || coverImage),
      firstname: firstname || '',
      surname: surname || '',
      role: role || '',
      description: description || '',
      socials: socials || [],
      coverImage: coverImage || {},
      dialog: false,
      errors: {},
    };
    this.validate = {
      firstname: { required: true },
      surname: { required: true },
    };
  }

  modifyImage = ({ image }) => {
    this.closeDialog();
    if (image) {
      this.setState({ coverImage: image[0], preview: image[0].preview });
    }
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  sendingFunction = (values) => {
    this.props.submit(values);
    this.props.closeDialog();
  }

  submit = () => {
    const validateValues = pick(this.state, keys(this.validate));
    validation(
      this.validate,
      validateValues,
      (errors) => { this.setState({ errors }); },
      () => {
        const values = pick(this.state, ['index', 'firstname', 'surname', 'role', 'description', 'socials', 'coverImage']);
        if (isEmpty(values.coverImage)) {
          this.getAvatarByGender(values.firstname, values, this.sendingFunction);
        } else {
          this.sendingFunction(values);
        }
      },
    );
  }

  getAvatarByGender = (name, values, sendingFunction) => {
    const url = `https://api.genderize.io/?name=${name}`;
    axios.get(url)
      .then((res) => {
        values.coverImage = (res.data.gender === 'male')
          ? '/img/placeholders/avatar-man.png'
          : '/img/placeholders/avatar-woman.png';
        sendingFunction(values);
      })
      .catch(() => {
        values.coverImage = '/img/placeholders/avatar-man.png';
        sendingFunction(values);
      });
  }

  updateSocials = ({ socials }) => {
    this.closeDialog();
    this.setState({ socials });
  }

  renderSocial = (social, index) => {
    const icon = socialsList[social.id].iconName;
    return (
      <Social className={`social__${icon} textHover borderHover`} href={social.link} target="_blank" key={index}>
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </Social>
    );
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
    console.log(this.state.coverImage);

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
              <ImagePreview preview={preview} onClick={() => { this.setState({ dialog: 'image' }); }}>
                {(imagePreview)
                  ? <img src={imagePreview} alt="Podgląd obrazu" />
                  : <i className="fa fa-plus" aria-hidden="true" />
                }
                {(imagePreview) &&
                  <ImagePreviewOverlay>
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                  </ImagePreviewOverlay>
                }
              </ImagePreview>
            </MediaElement>
            <MediaElement>
              <LabelHeader>Social media</LabelHeader>
              <SocialsWrapper>
                {socials.map((social, index) => this.renderSocial(social, index))}
                <AddSocial onClick={() => { this.setState({ dialog: 'socials' }); }}>
                  {(socials.length)
                    ? <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    : <i className="fa fa-plus" aria-hidden="true" />
                  }
                </AddSocial>
              </SocialsWrapper>
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
            sidebar={sidebar}
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
