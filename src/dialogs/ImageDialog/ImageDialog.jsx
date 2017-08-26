import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import DropzoneField from './DropzoneField/DropzoneField';
import './imageDialog.scss';

class ImageDialog extends Component {
  onSubmit = (data) => {
    if (Array.isArray(data)) console.info('POST', data.image[0]);
    this.props.closeDialog(); this.props.reset();
  }

  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    const dialogStyle = this.props.sidebar ? { width: 'calc(100vw - 150px)', marginLeft: 150 } : {};
    const tooltip = `
      <p style="font-weight: 500; margin-bottom: 5px;">Wymiary na stronie:</p>
      <p>${this.props.width} x ${this.props.height} px</p>
      <br>
      <p style="font-weight: 500; margin-bottom: 5px;">Maksymalny rozmiar:</p>
      <p>${this.props.maxSize / 1000} KB</p>
    `;
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={() => { this.props.closeDialog(); reset(); }}
        className="modal__container edit"
        bodyClassName="imageDialog__container"
        style={dialogStyle}
        autoScrollBodyContent
      >
        <form
          className="imageDialog__form"
          onSubmit={handleSubmit(this.onSubmit)}
          // onSubmit={handleSubmit((values) => { this.props.submitFunction(values); reset(); })}
        >
          <h1 className="imageDialog__header">{this.props.title}</h1>
          <Field
            name="image"
            component={DropzoneField}
            maxSize={this.props.maxSize}
            currentImage={this.props.data}
          />
          <div className="imageDialog__buttonContainer">
            <FlatButton
              className="imageDialog__button"
              label="Anuluj"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              disabled={pristine || submitting}
              onClick={() => { this.props.closeDialog(); reset(); }}
            />
            <RaisedButton
              className="imageDialog__button"
              label="Zapisz zmiany"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              type="submit"
              disabled={submitting}
              primary
            />
          </div>
        </form>
        <div className="imageDialog__info" data-tip={tooltip}>
          <i className="fa fa-info" aria-hidden="true" />
        </div>
        <ReactTooltip place="right" effect="solid" html />
      </Dialog>
    );
  }
}

export default reduxForm({
  form: 'ImageDialogForm',
})(ImageDialog);
