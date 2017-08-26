import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import reduxForm from 'redux-form/lib/reduxForm';
import FieldArray from 'redux-form/lib/FieldArray';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import RenderSocials from './RenderSocials/RenderSocials';
import './socialsDialog.scss';

class SocialsDialog extends Component {
  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    const dialogStyle = this.props.sidebar ? { width: 'calc(100vw - 150px)', marginLeft: 150 } : {};
    console.log(this.props);
    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
        className="modal__container edit"
        bodyClassName="socialsDialog__container"
        style={dialogStyle}
        autoScrollBodyContent
      >
        <form
          className="socialsDialog__form"
          onSubmit={handleSubmit((values) => { this.props.submitFunction(values); reset(); })}
        >
          <h1 className="socialsDialog__header">Edytuj social media</h1>
          <FieldArray name="socials" component={RenderSocials} initialize={this.props.data} />
          <div className="socialsDialog__buttonContainer">
            <FlatButton
              className="socialsDialog__button"
              label="Anuluj"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              disabled={pristine || submitting}
              onClick={() => { this.props.closeDialog(); reset(); }}
            />
            <RaisedButton
              className="socialsDialog__button"
              label="Zapisz zmiany"
              labelStyle={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              type="submit"
              disabled={submitting}
              primary
            />
          </div>
        </form>
      </Dialog>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

export default reduxForm({
  validate,
  form: 'SocialsDialogForm',
})(SocialsDialog);
