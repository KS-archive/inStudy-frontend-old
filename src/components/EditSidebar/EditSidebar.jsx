import React, { Component } from 'react';
import accesibleModules from '../../js/constants/accesibleModules';
import { Container, ContainerArrow, Wrapper, Title, Modules, IconWrapper, SidebarIcon, BottomIcons, ReactTooltip, SpecialBtn, SettingsIcon } from './EditSidebar_styles';

export default class EditSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'Moduły', // Moduły, Dodaj moduł, Edycja modułu, Dodawanie modułu
    };
  }

  generateIcon = (module) => {
    const IconComponent = (module.icon)
      ? module.icon
      : accesibleModules.filter(m => (m.kind === module.kind))[0].icon;
    const moduleData = (module.icon) ? {} : module;
    return (
      <SidebarIcon>
        <IconComponent onClick={() => { this.props.openDialog(module.kind, moduleData); }} />
      </SidebarIcon>
    );
  }

  renderModules = (mode) => {
    switch (mode) {
      case 'Moduły':
        return (
          <Modules>
            {this.props.modules.map((module, index) => (
              <IconWrapper key={index} data-tip={module.title}>
                {this.generateIcon(module)}
              </IconWrapper>
            ))}
          </Modules>
        );

      case 'Dodaj moduł':
        return (
          <Modules>
            {accesibleModules.map((module, index) => (
              <IconWrapper key={index} data-tip={module.name}>
                {this.generateIcon(module)}
              </IconWrapper>
            ))}
          </Modules>
        );
      default: return null;
    }
  }

  renderSpecialBtn = (mode) => {
    const tooltipAttr = { plece: 'right', effect: 'solid' };
    switch (mode) {
      case 'Moduły':
        return (
          <div>
            <SpecialBtn className="fa fa-plus" aria-hidden="true" onClick={() => { this.setState({ mode: 'Dodaj moduł' }); }} />
            <ReactTooltip {...tooltipAttr} />
          </div>
        );

      case 'Dodaj moduł':
        return (
          <div>
            <SpecialBtn className="fa fa-arrow-left" aria-hidden="true" onClick={() => { this.setState({ mode: 'Moduły' }); }} />
            <ReactTooltip {...tooltipAttr} />
          </div>
        );
      default: return null;
    }
  }

  render() {
    const { sidebar, toggleSidebar } = this.props;
    const mode = this.state.mode;
    const arrowDirection = sidebar ? 'left' : 'right';

    return (
      <Container open={sidebar}>
        <ContainerArrow onClick={toggleSidebar}>
          <i className={`fa fa-chevron-${arrowDirection}`} aria-hidden="true" />
        </ContainerArrow>
        <Wrapper>
          <Title>{mode}</Title>
          {this.renderModules(mode)}
          <BottomIcons>
            {this.renderSpecialBtn(mode)}
            <SettingsIcon className="fa fa-cog" aria-hidden="true" />
          </BottomIcons>
        </Wrapper>
      </Container>
    );
  }
}
