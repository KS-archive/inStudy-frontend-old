import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import FieldArray from 'redux-form/lib/FieldArray';
import FlatButton from 'material-ui/FlatButton';
import RenderSocials from './RenderSocials/RenderSocials';
import { EditDialog } from '../../js/globalStyles';
import { Form } from './SocialsDialog_styles';

class SocialsDialog extends Component {
  makeActivityInfoUpdateHandler = () => {
    this.activityFormButton.click();
  }

  render() {
    const { handleSubmit, closeDialog, submitting, pristine, destroy, open, sidebar } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        disabled={pristine || submitting}
        onTouchTap={() => { closeDialog(); destroy(); }}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.makeActivityInfoUpdateHandler}
        disabled={submitting}
        primary
      />,
    ];
    console.log(this.props);

    return (
      <EditDialog
        open={open}
        onRequestClose={() => { closeDialog(); destroy(); }}
        actions={actions}
        title="Edytuj social media"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form
          onSubmit={handleSubmit((values) => { this.props.submitFunction(values); destroy(); })}
        >
          <FieldArray name="socials" component={RenderSocials} initialize={this.props.data} />
          <button style={{ visibility: 'hidden', position: 'fixed' }} type="submit" ref={(button) => { this.activityFormButton = button; }} />
        </Form>
      </EditDialog>
    );
  }
}

export default reduxForm({
  form: 'SocialsDialogForm',
})(SocialsDialog);
