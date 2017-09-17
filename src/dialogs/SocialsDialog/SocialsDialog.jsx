import React, { Component } from 'react';
import reduxForm from 'redux-form/lib/reduxForm';
import FieldArray from 'redux-form/lib/FieldArray';
import RenderSocials from './RenderSocials/RenderSocials';
import { renderActionButtons } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Form } from './SocialsDialog_styles';

class SocialsDialog extends Component {
  actions = renderActionButtons(
    () => { this.props.closeDialog(); this.props.destroy(); },
    () => { this.makeActivityInfoUpdateHandler(); },
  );

  makeActivityInfoUpdateHandler = () => {
    this.activityFormButton.click();
  }

  render() {
    const { handleSubmit, closeDialog, open, sidebar } = this.props;
    console.log(this.props);

    return (
      <EditDialog
        open={open}
        onRequestClose={() => { closeDialog(); destroy(); }}
        actions={this.actions}
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
