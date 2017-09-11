import React, { Component } from 'react';
import { getRandomInt } from '../../js/utils';
import accesibleModules from '../../js/constants/accesibleModules';
import { Container, ContainerArrow, Wrapper, Title, Modules, IconWrapper, SidebarIcon, BottomIcons, StyledReactTooltip, SpecialBtn, Icon, Filler, EditIconSet } from './EditSidebar_styles';

export default class EditSidebar extends Component {
  generateIcon = (module) => {
    const key = Date.now() + getRandomInt(1000, 9999);
    const IconComponent = (module.icon)
      ? module.icon // Add new module
      : accesibleModules.filter(m => (m.kind === module.kind))[0].icon; // Edit existing module
    const moduleData = (module.icon) ? {} : module;
    const handleClick = () => {
      this.props.openDialog(module.kind, moduleData);
      this.props.changeContent({ mode: (module.icon) ? 'Dodawanie modułu' : 'Edycja modułu', editingModule: IconComponent });
    };
    const dataTip = (module.icon) ? module.name : module.title;
    return (
      <IconWrapper key={key} data-tip={dataTip} onClick={handleClick}>
        <SidebarIcon>
          <IconComponent />
        </SidebarIcon>
      </IconWrapper>
    );
  }

  renderModules = (mode) => {
    const { submit, cancel, remove, changeColors } = this.props.modalFunctions;
    console.log(this.props.modalFunctions);
    switch (mode) {
      case 'Moduły':
        return (
          <Modules>
            {this.props.modules.map(module => this.generateIcon(module))}
          </Modules>
        );

      case 'Dodaj moduł':
        return (
          <Modules>
            {accesibleModules.map(module => this.generateIcon(module))}
          </Modules>
        );
      case 'Edycja modułu':
        return (
          <Modules>
            <IconWrapper>
              <SidebarIcon>
                <this.props.editingModule />
              </SidebarIcon>
            </IconWrapper>
            <EditIconSet>
              <Icon className="fa fa-check" aria-hidden="true" onClick={submit} />
              <Icon className="fa fa-ban" aria-hidden="true" onClick={cancel} />
              <Icon className="fa fa-trash-o" aria-hidden="true" onClick={remove} />
            </EditIconSet>
            <EditIconSet>
              {changeColors &&
                <Icon className="fa fa-paint-brush" aria-hidden="true" onClick={changeColors} />
              }
            </EditIconSet>
          </Modules>
        );
      case 'Dodawanie modułu':
        return (
          <Modules>
            <IconWrapper>
              <SidebarIcon>
                <this.props.editingModule />
              </SidebarIcon>
            </IconWrapper>
            <EditIconSet>
              <Icon className="fa fa-check" aria-hidden="true" onClick={submit} />
              <Icon className="fa fa-ban" aria-hidden="true" onClick={cancel} />
            </EditIconSet>
            <EditIconSet>
              {changeColors &&
                <Icon className="fa fa-paint-brush" aria-hidden="true" onClick={changeColors} />
              }
            </EditIconSet>
          </Modules>
        );
      default: return null;
    }
  }

  renderSpecialBtn = (mode) => {
    switch (mode) {
      case 'Moduły':
        return (
          <div>
            <SpecialBtn className="fa fa-plus" aria-hidden="true" onClick={() => { this.props.changeContent({ mode: 'Dodaj moduł' }); }} />
          </div>
        );

      case 'Dodaj moduł':
        return (
          <div>
            <SpecialBtn className="fa fa-arrow-left" aria-hidden="true" onClick={() => { this.props.changeContent({ mode: 'Moduły' }); }} />
          </div>
        );
      default: return null;
    }
  }

  render() {
    const { sidebar, toggleSidebar } = this.props;
    const mode = this.props.mode;
    const arrowDirection = sidebar ? 'left' : 'right';

    return (
      <div>
        <Container open={sidebar}>
          <ContainerArrow onClick={toggleSidebar}>
            <i className={`fa fa-chevron-${arrowDirection}`} aria-hidden="true" />
          </ContainerArrow>
          <Wrapper>
            <Title>{mode}</Title>
            {this.renderModules(mode)}
            <BottomIcons>
              {this.renderSpecialBtn(mode)}
              <Icon className="fa fa-arrows-v" aria-hidden="true" onClick={this.props.changeOrder} />
            </BottomIcons>
          </Wrapper>
        </Container>
        <Filler open={sidebar} onClick={toggleSidebar} />
        <StyledReactTooltip place="right" effect="solid" />
      </div>
    );
  }
}
