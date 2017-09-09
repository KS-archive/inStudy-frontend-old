import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import validate from '../../../js/validation';
import socialsList from '../../../js/constants/socials';
import ImageDialog from '../../ImageDialog/ImageDialog';
import SocialsDialog from '../../SocialsDialog/SocialsDialog';
import { renderActionButtons, renderTextField } from '../../../js/renderHelpers';
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
    this.toValidate = {
      firstname: { required: true },
      surname: { required: true },
    };
    this.values = ['index', 'firstname', 'surname', 'role', 'description', 'socials', 'coverImage'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  getAvatarByGender = (values) => {
    const url = `https://api.genderize.io/?name=${values.firstname}`;
    axios.get(url)
      .then((res) => {
        values.coverImage = (res.data.gender === 'male')
          ? '/img/placeholders/avatar-man.png'
          : '/img/placeholders/avatar-woman.png';
        this.sendingFunction(values);
      })
      .catch(() => {
        values.coverImage = '/img/placeholders/avatar-man.png';
        this.sendingFunction(values);
      });
  }

  submit = (values) => {
    if (isEmpty(values.coverImage)) {
      this.getAvatarByGender(values);
    } else {
      this.sendingFunction(values);
    }
  }

  handleSubmit = () => { validate(this, this.submit); }

  sendingFunction = (values) => {
    this.props.submit(values);
    this.props.closeDialog();
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  modifyImage = ({ image }) => {
    this.closeDialog();
    if (image) {
      this.setState({ coverImage: image[0], preview: image[0].preview });
    }
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
    const { closeDialog, sidebar, open } = this.props;
    const { preview, socials, coverImage, dialog } = this.state;
    const imagePreview = preview || '';

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title="Edytuj element galerii"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {renderTextField(this, 'Imię', 'firstname')}
          {renderTextField(this, 'Nazwisko', 'surname')}
          {renderTextField(this, 'Rola', 'role')}
          {renderTextField(this, 'Opis', 'description')}
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
