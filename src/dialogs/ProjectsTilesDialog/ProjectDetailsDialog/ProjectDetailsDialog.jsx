import React, { Component } from 'react';
import PropTypes from 'prop-types';
import without from 'lodash/without';
import validate from '../../../js/validation';
import socialsList from '../../../js/constants/socials';
import ImageDialog from '../../ImageDialog/ImageDialog';
import SocialsDialog from '../../SocialsDialog/SocialsDialog';
import { renderActionButtons, renderTextField } from '../../../js/renderHelpers';
import { EditDialog, LabelHeader, Image, ImageOverlay, ImageOptions } from '../../../js/globalStyles';
import { Container, ImagePreview, ImagePreviewOverlay, MediaWrapper, MediaElement, SocialsWrapper, Social, AddSocial, GalleryWrapper } from './ProjectDetailsDialog_styles';

export default class ProjectDetailsDialog extends Component {
  constructor(props) {
    super(props);
    const { coverImage, images, description, title, header, labels, socials, index } = this.props.data;
    this.state = {
      index,
      preview: coverImage && (coverImage.preview || coverImage),
      coverImage: coverImage || {},
      images: images || [],
      title: title || '',
      header: header || '',
      labels: labels || [],
      description: description || '',
      socials: socials || [],
      dialog: false,
      dialogData: {},
      editingIndex: null,
      errors: {},
    };
    this.toValidate = {
      title: { required: true },
      description: { required: true },
      preview: { required: 'Kafelek projektowy musi posiadać zdjęcie główne' },
    };
    this.values = ['coverImage', 'images', 'title', 'header', 'labels', 'description', 'socials'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  submit = (values) => {
    console.log(values);
    this.props.submit(values);
    this.props.closeDialog();
  }

  handleSubmit = () => { validate(this, this.submit); }

  closeDialog = () => {
    this.setState({
      dialog: false,
      dialogData: {},
      editingIndex: null,
    });
  }

  updateImageDialog = (image, index) => {
    this.setState({
      dialog: 'image',
      dialogData: Array.isArray(image) ? image[0].preview : image,
      editingIndex: index,
    });
  }

  updateCoverImageDialog = () => {
    const { coverImage } = this.state;
    this.setState({
      dialog: 'image',
      dialogData: (typeof coverImage === 'object') ? coverImage.preview : coverImage,
      editingIndex: 'cover',
    });
  }

  modifyImages = ({ image }) => {
    if (image) {
      const { editingIndex } = this.state;
      if (editingIndex === 'cover') {
        this.setState({ coverImage: image[0], preview: image[0].preview });
      } else {
        const images = [...this.state.images];
        if (editingIndex || editingIndex === 0) { // Edit
          images[editingIndex] = image;
        } else { // Add
          images.push(image);
        }
        this.setState({ images });
      }
    }
    this.closeDialog();
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
      <Image key={index}>
        <img src={imgSrc} alt="" />
        <ImageOverlay>
          <ImageOptions>
            <i
              className="fa fa-pencil-square-o"
              aria-hidden="true"
              onClick={() => { this.updateImageDialog(image, index); }}
            />
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={() => { this.deleteImage(image); }}
            />
          </ImageOptions>
        </ImageOverlay>
      </Image>
    );
  }

  render() {
    const { closeDialog, sidebar, open } = this.props;
    const { preview, socials, dialogData, dialog, images } = this.state;
    const imagePreview = preview || '';
    const dialogTitle = imagePreview ? 'Modyfikuj kafelek projektowy' : 'Dodaj kafelek projektowy';
    const multilineAttrs = {
      multiLine: true,
      rows: 1,
    };

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
          {renderTextField(this, 'Nazwa', 'title')}
          {renderTextField(this, 'Nagłówek', 'header', true, multilineAttrs)}
          {renderTextField(this, 'Opis szczegółowy', 'description', true, multilineAttrs)}
          <MediaWrapper>
            <MediaElement>
              <LabelHeader>Zdjęcie główne</LabelHeader>
              <ImagePreview preview={preview} onClick={this.updateCoverImageDialog}>
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
                <Image onClick={() => { this.setState({ dialog: 'image' }); }}>
                  <i className="fa fa-plus" aria-hidden="true" />
                </Image>
              </GalleryWrapper>
            </MediaElement>
          </MediaWrapper>
        </Container>
        {(dialog === 'image') &&
          <ImageDialog
            open
            submitFunction={this.modifyImages}
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
    title: PropTypes.string,
    header: PropTypes.string,
    _id: PropTypes.string,
    images: PropTypes.array,
    labels: PropTypes.array,
    socials: PropTypes.array,
    index: PropTypes.number,
  }).isRequired,
};
