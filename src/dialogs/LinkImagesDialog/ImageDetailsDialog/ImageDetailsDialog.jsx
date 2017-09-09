import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import pick from 'lodash/pick';
import ImageDialog from '../../ImageDialog/ImageDialog';
import { renderActionButtons, renderTextField } from '../../../js/renderHelpers';
import { EditDialog } from '../../../js/globalStyles';
import { Container, ImagePreview, Editfields } from './ImageDetailsDialog_styles';

export default class ImageDetailsDialog extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      preview: data.src.preview || data.src,
      name: data.name || '',
      src: data.src || '',
      link: data.link || '',
      dialog: false,
      errors: {},
    };
    this.values = ['name', 'src', 'link'];
    this.actions = renderActionButtons(this.props.closeDialog, this.submit);
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
    const index = this.props.data && this.props.data.index;
    const values = { index, ...pick(this.state, this.values) };
    this.props.submit(values);
  }

  render() {
    const { closeDialog, sidebar } = this.props;
    const { preview, src, dialog } = this.state;
    const imagePreview = preview || '';

    return (
      <EditDialog
        open
        onRequestClose={closeDialog}
        actions={this.actions}
        title="Edytuj element galerii"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          <ImagePreview preview={preview}>
            <img src={imagePreview} alt="Podgląd obrazu" />
          </ImagePreview>
          <Editfields>
            {renderTextField(this, 'Nazwa obrazu', 'name')}
            {renderTextField(this, 'Link', 'link')}
            <RaisedButton
              label={(preview) ? 'Zmień obraz' : 'Wczytaj obraz'}
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              style={{ marginTop: 10 }}
              onClick={() => { this.setState({ dialog: true }); }}
              primary
            />
          </Editfields>
        </Container>
        {(dialog) &&
          <ImageDialog
            open
            submitFunction={this.modifyImage}
            closeDialog={this.closeDialog}
            width={266}
            height={150}
            maxSize={200000}
            title="Modyfikuj zdjęcie"
            data={src.preview || src}
            sidebar={sidebar}
          />
        }
      </EditDialog>
    );
  }
}
