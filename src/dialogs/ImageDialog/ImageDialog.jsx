import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import DropzoneField from './DropzoneField/DropzoneField';
import { EditDialog } from '../../js/globalStyles';
import { Form, InfoIcon } from './ImageDialog_styles';

class ImageDialog extends Component {
  makeActivityInfoUpdateHandler = () => {
    this.activityFormButton.click();
  }

  render() {
    const { handleSubmit, closeDialog, submitting, pristine, destroy, open, sidebar, data, title, width, height, maxSize } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        disabled={pristine || submitting}
        onTouchTap={() => { closeDialog(); destroy(); }}
      />,
      <FlatButton
        label="Zapisz"
        onTouchTap={this.makeActivityInfoUpdateHandler}
        disabled={submitting}
        primary
      />,
    ];
    const tooltip = `
      <p style="font-weight: 500; margin-bottom: 5px;">Wymiary na stronie:</p>
      <p>${width} x ${height} px</p>
      <br>
      <p style="font-weight: 500; margin-bottom: 5px;">Maksymalny rozmiar:</p>
      <p>${maxSize / 1000} KB</p>
    `;

    return (
      <EditDialog
        open={open}
        onRequestClose={() => { closeDialog(); destroy(); }}
        actions={actions}
        title={title}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form
          onSubmit={handleSubmit((values) => { this.props.submitFunction(values); destroy(); })}
        >
          <Field
            name="image"
            component={DropzoneField}
            maxSize={maxSize}
            currentImage={data}
          />
          <button style={{ visibility: 'hidden', position: 'fixed' }} type="submit" ref={(button) => { this.activityFormButton = button; }} />
        </Form>
        <InfoIcon data-tip={tooltip}>
          <i className="fa fa-info" aria-hidden="true" />
        </InfoIcon>
        <ReactTooltip place="left" effect="solid" html />
      </EditDialog>
    );
  }
}

export default reduxForm({
  form: 'ImageDialogForm',
})(ImageDialog);
