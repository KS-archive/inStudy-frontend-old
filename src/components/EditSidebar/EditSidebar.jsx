import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import renderMiddle from './helpers/renderMiddle';
import renderSpecialBtn from './helpers/renderSpecialBtn';
import ChangeTagsDialog from '../../dialogs/editing/ChangeTagsDialog/ChangeTagsDialog';
import MainColorsDialog from '../../dialogs/editing/MainColorsDialog/MainColorsDialog';
import ChangePasswordDialog from '../../dialogs/editing/ChangePasswordDialog/ChangePasswordDialog';
import { Container, ContainerArrow, Wrapper, Title, BottomIcons, Icon, Filler } from './EditSidebar_styles';

export default class EditSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: null,
      shadows: {},
    };
  }

  changeOrder = () => {
    this.props.changeContent({ mode: 'Ustawienia' });
    this.props.changeOrder(this.props.modules);
  }

  closeDialog = () => {
    this.setState({ dialog: null }, () => {
      this.props.changeContent({ mode: 'Moduły' });
    });
  }

  handleScroll = (values) => {
    const shadows = {};

    if (values.clientHeight !== values.scrollHeight && this.props.sidebar) {
      shadows.top = (values.top !== 0);
      shadows.bottom = (values.top !== 1);
    }

    if (!isEqual(shadows, this.state.shadows)) {
      this.setState({ shadows });
    }
  }

  enterSettings = (dialogName) => {
    this.props.changeContent({ mode: 'Ustawienia' });
    this.setState({ dialog: dialogName });
  }

  render() {
    const { sidebar, toggleSidebar, modules, logout, colors, tags } = this.props;
    const { dialog } = this.state;
    const mode = this.props.mode;
    const arrowDirection = sidebar ? 'left' : 'right';
    const iconButtonElement = (
      <IconButton>
        <Icon className="fa fa-cog" aria-hidden="true" />
      </IconButton>
    );
    const origin = { horizontal: 'left', vertical: 'bottom' };

    return (
      <div>
        <Container open={sidebar}>
          <ContainerArrow onClick={toggleSidebar}>
            <i className={`fa fa-chevron-${arrowDirection}`} aria-hidden="true" />
          </ContainerArrow>
          <Wrapper>
            <Title>{mode}</Title>
            {renderMiddle(mode, this)}
            {(mode !== 'Edycja modułu' && mode !== 'Ustawienia') &&
              <BottomIcons>
                {renderSpecialBtn(mode, this)}
                <IconMenu
                  iconButtonElement={iconButtonElement}
                  anchorOrigin={origin}
                  targetOrigin={origin}
                >
                  {(modules.length > 1) &&
                    <MenuItem primaryText="Zmień kolejność modułów" onClick={this.changeOrder} />
                  }
                  <MenuItem primaryText="Edytuj tagi" onClick={() => { this.enterSettings('tags'); }} />
                  <MenuItem primaryText="Edytuj kolory" onClick={() => { this.enterSettings('colors'); }} />
                  <MenuItem primaryText="Zmień hasło" onClick={() => { this.enterSettings('password'); }} />
                  <MenuItem primaryText="Wyloguj" onClick={logout} />
                </IconMenu>
              </BottomIcons>
            }
          </Wrapper>
        </Container>
        <Filler open={sidebar} onClick={toggleSidebar}>
          Aby móc edytować profil musisz zwiększyć rozmiar okna przeglądarki
        </Filler>
        {(dialog === 'colors') &&
          <MainColorsDialog
            sidebar={sidebar}
            closeDialog={this.closeDialog}
            data={colors}
          />
        }
        {(dialog === 'password') &&
          <ChangePasswordDialog
            sidebar={sidebar}
            closeDialog={this.closeDialog}
          />
        }
        {(dialog === 'tags') &&
          <ChangeTagsDialog
            sidebar={sidebar}
            closeDialog={this.closeDialog}
            data={tags}
          />
        }
      </div>
    );
  }
}
