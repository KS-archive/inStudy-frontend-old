import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ImageDialog from '../../ImageDialog/ImageDialog';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container, ImagePreview, Editfields } from './ImageDetailsDialog_styles';

export default class ImageDetailsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: '',
      name: '',
      src: '',
      link: '',
      dialog: false,
      errors: {
        name: null,
        link: null,
      },
    };
  }

  componentWillMount() {
    if (this.props.data) {
      const { name, src, link } = this.props.data;
      this.setState({ name, src, link, preview: src });
    }
  }

  modifyImage = (value) => {
    this.closeDialog();
    if (value.image) {
      this.setState({ src: value.image[0], preview: value.image[0].preview });
    }
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  submit = () => {
    const values = {
      index: this.props.data ? this.props.data.index : null,
      name: this.state.name,
      src: this.state.src,
      link: this.state.link,
    };
    this.props.submit(values);
  }

  render() {
    const { closeDialog, sidebar } = this.props;
    const { preview } = this.state;
    const actions = [
      <FlatButton
        label="Anuluj"
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.submit}
        disabled={!preview}
        primary
      />,
    ];
    const imagePreview = preview || '';

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
          <ImagePreview preview={preview}>
            <img src={imagePreview} alt="Podgląd obrazu" />
          </ImagePreview>
          <Editfields>
            <TextField
              value={this.state.name}
              onChange={(e) => { this.setState({ name: e.target.value }); }}
              floatingLabelText="Nazwa obrazu"
              errorText={this.state.errors.name}
              fullWidth
              {...inputStyle}
            />
            <TextField
              value={this.state.link}
              onChange={(e) => { this.setState({ link: e.target.value }); }}
              floatingLabelText="Link"
              errorText={this.state.errors.link}
              fullWidth
              {...inputStyle}
            />
            <RaisedButton
              label={(preview) ? 'Zmień obraz' : 'Wczytaj obraz'}
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              style={{ marginTop: 10 }}
              onClick={() => { this.setState({ dialog: true }); }}
              primary
            />
          </Editfields>
        </Container>
        {this.state.dialog &&
          <ImageDialog
            open
            submitFunction={this.modifyImage}
            closeDialog={this.closeDialog}
            width={266}
            height={150}
            maxSize={50000}
            title="Modyfikuj zdjęcie"
            data={this.state.src}
            sidebar={this.props.sidebar}
          />
        }
      </EditDialog>
    );
  }
}
