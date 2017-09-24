import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import validate from '../../../../utils/validation';
import socialsList from '../../../../utils/constants/socials';
import ImageDialog from '../../../helpers/ImageDialog/ImageDialog';
import SocialsDialog from '../../../helpers/SocialsDialog/SocialsDialog';
import { getTokenHeader } from '../../../../utils/utils';
import { renderActionButtons, renderTextField } from '../../../../utils/renderHelpers';
import { EditDialog } from '../../../../utils/globalStyles';
import { Container, ImagePreview, ImagePreviewOverlay, MediaWrapper, MediaElement, LabelHeader, SocialsWrapper, Social, AddSocial } from './MemberDetailsDialog_styles';

export default class MemberDetailsDialog extends Component {
  constructor(props) {
    super(props);
    const { coverImage, description, firstname, surname, role, socials, id, index } = this.props.data;
    console.log(id);
    this.state = {
      index,
      id: id || Date.now(),
      firstname: firstname || '',
      surname: surname || '',
      role: role || '',
      description: description || '',
      socials: socials || [],
      coverImage: coverImage || '',
      dialog: false,
      errors: {},
    };
    this.toValidate = {
      firstname: { required: true },
      surname: { required: true },
    };
    this.values = ['id', 'index', 'firstname', 'surname', 'role', 'description', 'socials', 'coverImage'];
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
    console.log(values);
    this.props.submit(values);
    this.props.closeDialog();
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  modifyImage = (value) => {
    if (value.image) {
      const url = `${__ROOT_URL__}api/file/send`;
      let headers = getTokenHeader();
      headers = { ...headers, 'content-type': 'multipart/form-data' };

      const formData = new FormData();
      formData.append('image', value.image[0]);
      formData.append('id', this.props.id);

      axios.post(url, formData, { headers }).then((data) => {
        this.setState({ coverImage: data.data.data });
        this.closeDialog();
      });
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
    const { socials, coverImage, dialog } = this.state;

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title="Edytuj kafelek osobowy"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {renderTextField(this, 'Imię', 'firstname')}
          {renderTextField(this, 'Nazwisko', 'surname')}
          {renderTextField(this, 'Rola', 'role')}
          {renderTextField(this, 'Opis', 'description', true, { multiLine: true })}
          <MediaWrapper>
            <MediaElement>
              <LabelHeader>Zdjęcie</LabelHeader>
              <ImagePreview preview={coverImage} onClick={() => { this.setState({ dialog: 'image' }); }}>
                {(coverImage)
                  ? <img src={coverImage} alt="Podgląd obrazu" />
                  : <i className="fa fa-plus" aria-hidden="true" />
                }
                {(coverImage) &&
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
            maxSize={300000}
            title="Modyfikuj zdjęcie"
            data={coverImage}
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
