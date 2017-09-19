import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import ChipInput from 'material-ui-chip-input';
import validate from '../../js/validation';
import { changeTags } from '../../actions/circleEdit';
import { renderActionButtons } from '../../js/renderHelpers';
import { EditDialog } from '../../js/globalStyles';
import { Form } from './ChangeTagsDialog_styles';

class ChangeTagsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.data,
      errors: {},
    };

    this.toValidate = {
      tags: { noEmptyArr: true },
    };
    this.values = ['tags'];
    this.actions = renderActionButtons(this.props.closeDialog, this.handleSubmit);
  }

  handleAddChip = (chip) => {
    this.setState({ tags: [...this.state.tags, chip] });
  }

  handleDeleteChip = (chip, index) => {
    const tags = [...this.state.tags];
    tags.splice(index, 1);
    this.setState({ tags });
  }

  handleSubmit = () => { validate(this, this.submit); }

  submit = (values) => {
    this.props.changeTags(values, this.props.closeDialog);
  }

  render() {
    const { closeDialog, sidebar } = this.props;

    return (
      <EditDialog
        open
        onRequestClose={closeDialog}
        actions={this.actions}
        title="Edytuj tagi"
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Form>
          <ChipInput
            value={this.state.tags}
            onRequestAdd={chip => this.handleAddChip(chip)}
            onRequestDelete={(chip, index) => this.handleDeleteChip(chip, index)}
            fullWidth
            newChipKeyCodes={[13, 188, 186, 9]}
          />
        </Form>
      </EditDialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeTags }, dispatch);
}

export default connect(null, mapDispatchToProps)(ChangeTagsDialog);
