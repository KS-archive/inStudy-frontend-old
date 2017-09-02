import React, { Component } from 'react';
import { StyledDropzone, Text, ImageError } from './DropzoneField_styles';

export default class DropzoneField extends Component {
  constructor(props) {
    super(props);
    this.state = { file: {}, error: '' };
  }

  onDrop = (files) => {
    if (files && files.length > 0) {
      this.props.input.onChange(files);
      this.setState({ file: files[0], error: '' });
    }
  }

  rejectImage = (data) => {
    const image = data[0];
    if (image.size > this.props.maxSize) this.setState({ error: `Rozmiar zdjęcia nie może przkraczać ${this.props.maxSize / 1000}KB` });
  }

  render() {
    const { file, error } = this.state;
    const preview = (file && file.preview) || this.props.currentImage;
    return (
      <div>
        <StyledDropzone
          accept="image/jpeg, image/png, image/jpg, image/svg"
          preview={preview}
          style={{ backgroundImage: `url(${preview})` }}
          name={this.props.input.name}
          multiple={false}
          maxSize={this.props.maxSize}
          onDrop={this.onDrop}
          onDropRejected={this.rejectImage}
        >
          <Text>Upuść tutaj plik ze zdjęciem</Text>
        </StyledDropzone>
        {error &&
          <ImageError>{error}</ImageError>
        }
      </div>
    );
  }
}
