import React, { Component } from 'react';
import PropTypes from 'prop-types';
import without from 'lodash/without';
import validate from '../../../js/validation';
import socialsList from '../../../js/constants/socials';
import ImageDialog from '../../ImageDialog/ImageDialog';
import SocialsDialog from '../../SocialsDialog/SocialsDialog';
import { renderActionButtons, renderTextField } from '../../../js/renderHelpers';
import { EditDialog } from '../../../js/globalStyles';
import { Container, ImagePreview, ImagePreviewOverlay, MediaWrapper, MediaElement, LabelHeader, SocialsWrapper, Social, AddSocial, GalleryWrapper, Element, ElementOptionsOverlay, ElementOptions } from './ProjectDetailsDialog_styles';

export default class ProjectDetailsDialog extends Component {
  constructor(props) {
    super(props);
    const { coverImage, images, description, name, header, labels, socials, index } = this.props.data;
    this.state = {
      index,
      preview: coverImage && (coverImage.preview || coverImage),
      coverImage: coverImage || {},
      images: images || [],
      name: name || '',
      header: header || '',
      labels: labels || [],
      description: description || '',
      socials: socials || [],
      dialog: false,
      dialogData: {},
      errors: {},
    };
    this.toValidate = {
      name: { required: true },
      description: { required: true },
      preview: { required: true },
    };
    this.values = ['coverImage', 'images', 'name', 'header', 'labels', 'description', 'socials'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  submit = (values) => {
    console.log(values);
    this.props.submit(values);
    this.props.closeDialog();
  }

  handleSubmit = () => { validate(this, this.submit); }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  modifyImage = ({ image }) => {
    console.log(image);
    if (image) {
      const { index } = this.state.dialogData;
      if (index === 'cover') {
        this.setState({ coverImage: image[0], preview: image[0].preview });
      } else {
        const images = [...this.state.images];
        if (index || index === 0) { // Edit
          images[index] = image;
        } else { // Add
          images.push(image);
        }
        this.setState({ images });
      }
    }
    this.closeDialog();
  }

  editImage = (image, index) => {
    this.setState({
      dialog: 'image',
      dialogData: { ...image, index },
    });
  }

  editCoverImage = () => {
    this.setState({
      dialog: 'image',
      dialogData: { ...this.state.coverImage, index: 'cover' },
    });
  }

  deleteImage = (image) => {
    const images = without(this.state.images, image);
    this.setState({ images });
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

  renderImage = (image, index) => {
    const imgSrc = (typeof image === 'string') ? image : image[0].preview;
    return (
      <Element key={index}>
        <img src={imgSrc} alt="" />
        <ElementOptionsOverlay>
          <ElementOptions>
            <i
              className="fa fa-pencil-square-o"
              aria-hidden="true"
              onClick={() => { this.editImage(image, index); }}
            />
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={() => { this.deleteImage(image); }}
            />
          </ElementOptions>
        </ElementOptionsOverlay>
      </Element>
    );
  }

  render() {
    const { closeDialog, sidebar, open } = this.props;
    const { preview, socials, dialogData, dialog, images } = this.state;
    const imagePreview = preview || '';
    const dialogTitle = imagePreview ? 'Modyfikuj kafelek projektowy' : 'Dodaj kafelek projektowy';
    const multiline1 = { multiLine: true, rows: 2 };
    const multiline2 = { multiLine: true, rows: 3 };

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={this.actions}
        title={dialogTitle}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {renderTextField(this, 'Nazwa', 'name')}
          {renderTextField(this, 'Nagłówek', 'header', true, multiline1)}
          {renderTextField(this, 'Opis szczegółowy', 'description', true, multiline2)}
          <MediaWrapper>
            <MediaElement>
              <LabelHeader>Zdjęcie główne</LabelHeader>
              <ImagePreview preview={preview} onClick={() => { this.setState({ dialog: 'image' }); }}>
                {(imagePreview)
                  ? <img src={imagePreview} alt="" />
                  : <i className="fa fa-plus" aria-hidden="true" />
                }
                {(imagePreview) &&
                  <ImagePreviewOverlay>
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                  </ImagePreviewOverlay>
                }
              </ImagePreview>
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
            <MediaElement>
              <LabelHeader>Galeria projektu</LabelHeader>
              <GalleryWrapper>
                {images.map((image, index) => this.renderImage(image, index))}
                <ImagePreview preview={false} onClick={() => { this.setState({ dialog: 'image' }); }}>
                  <i className="fa fa-plus" aria-hidden="true" />
                </ImagePreview>
              </GalleryWrapper>
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
            data={dialogData}
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

ProjectDetailsDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    coverImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.string,
    name: PropTypes.string,
    header: PropTypes.string,
    _id: PropTypes.string,
    images: PropTypes.array,
    labels: PropTypes.array,
    socials: PropTypes.array,
    index: PropTypes.number,
  }).isRequired,
};
