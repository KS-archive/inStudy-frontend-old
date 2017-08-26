import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './dropzoneField.scss';

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
    const preview = (this.state.file && this.state.file.preview) || this.props.currentImage;
    return (
      <div className="dropzoneField__container">
        <Dropzone
          accept="image/jpeg, image/png, image/jpg, image/svg"
          className={`dropzoneField__dropzone ${preview && 'dropzoneField__withImg'}`}
          activeClassName="dropzoneField__active"
          rejectClassName="dropzoneField__reject"
          style={{ backgroundImage: `url(${preview})` }}
          name={this.props.input.name}
          multiple={false}
          maxSize={this.props.maxSize}
          onDrop={this.onDrop}
          onDropRejected={this.rejectImage}
        >
          <div className="dropzoneField__text">Upuść tutaj plik ze zdjęciem</div>
        </Dropzone>
        {this.state.error &&
        <div className="dropzoneField__error">{this.state.error}</div>}
      </div>
    );
  }
}
