import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ImageDialog from '../../ImageDialog/ImageDialog';
import { inputStyle } from '../../../js/constants/styles';
import { EditDialog } from '../../../js/globalStyles';
import { Container, ImagePreview, Editfields } from './MemberDetailsDialog_styles';

export default class MemberDetailsDialog extends Component {
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
    const { data } = this.props;
    if (data) {
      const { name, src, link } = data;
      this.setState({ name, src, link, preview: src.preview || src });
    }
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

  render() {
    const { closeDialog, sidebar } = this.props;
    const { preview, src, dialog, name, link, errors } = this.state;
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
              value={name}
              onChange={(e) => { this.setState({ name: e.target.value }); }}
              floatingLabelText="Nazwa obrazu"
              errorText={errors.name}
              fullWidth
              {...inputStyle}
            />
            <TextField
              value={link}
              onChange={(e) => { this.setState({ link: e.target.value }); }}
              floatingLabelText="Link"
              errorText={errors.link}
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
