import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import fontAwesomeIcons from '../../utils/constants/fontAwesomeIcons';
import { EditDialog } from '../../utils/globalStyles';
import { Container, IconWrapper, Icon } from './IconsDialog_styles';

export default class IconsDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIcon: this.props.data,
    };
  }

  setIcon = (activeIcon) => {
    this.setState({ activeIcon });
  }

  handleSubmit = () => {
    this.props.submit(this.state.activeIcon);
  }

  renderIcons = () => {
    return fontAwesomeIcons.map((icon) => {
      const active = this.state.activeIcon === icon;
      return (
        <IconWrapper key={icon} active={active} onClick={() => { this.setIcon(icon); }}>
          <Icon className={`fa fa-${icon}`} />
        </IconWrapper>
      );
    });
  }

  render() {
    const { closeDialog, open, sidebar, data } = this.props;
    const actions = [
      <FlatButton
        label="Anuluj"
        onTouchTap={closeDialog}
      />,
      <FlatButton
        label="Zapisz zmiany"
        onTouchTap={this.handleSubmit}
        primary
      />,
    ];

    return (
      <EditDialog
        open={open}
        onRequestClose={closeDialog}
        actions={actions}
        title={data ? 'Edytuj ikonę' : 'Wybierz ikonę'}
        autoScrollBodyContent
        repositionOnUpdate={false}
        isSidebar={sidebar}
      >
        <Container>
          {this.renderIcons()}
        </Container>
      </EditDialog>
    );
  }
}
