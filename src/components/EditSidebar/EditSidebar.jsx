import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import accesibleModules from '../../js/accesibleModules';
import './editSidebar.scss';

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
    return <IconComponent className="editSidebar__icon" onClick={() => { this.props.openDialog(module.kind, moduleData); }} />;
  }

  render() {
    return (
      <div className={`editSidebar__container ${!this.props.sidebar && 'hidden'}`}>
        <div className="editSidebar__containerArrow" onClick={this.props.toggleSidebar}>
          <i className={`fa fa-chevron-${this.props.sidebar ? 'left' : 'right'}`} aria-hidden="true" />
        </div>
        <div className="editSidebar__wrapper">
          <div className="editSidebar__title">{this.state.mode}</div>
          {(this.state.mode === 'Moduły') &&
          <div className="editSidebar__modules">
            {this.props.modules.map((module, index) => (
              <div className="editSidebar__iconWrapper" key={index} data-tip={module.title}>
                {this.generateIcon(module)}
              </div>
            ))}
          </div>
          }
          {(this.state.mode === 'Dodaj moduł') &&
          <div className="editSidebar__modules">
            {accesibleModules.map((module, index) => (
              <div className="editSidebar__iconWrapper" key={index} data-tip={module.name}>
                {this.generateIcon(module)}
              </div>
            ))}
          </div>
          }
          <div className="editSidebar__bottomIcons">
            {(this.state.mode === 'Moduły') &&
              <div>
                <i className="fa fa-plus editSidebar__specialBtn" aria-hidden="true" onClick={() => { this.setState({ mode: 'Dodaj moduł' }); }} />
                <ReactTooltip place="right" effect="solid" className="editSidebar__tooltip" />
              </div>
            }
            {(this.state.mode === 'Dodaj moduł') &&
              <div>
                <i className="fa fa-arrow-left editSidebar__specialBtn" aria-hidden="true" onClick={() => { this.setState({ mode: 'Moduły' }); }} />
                <ReactTooltip place="right" effect="solid" className="editSidebar__tooltip" />
              </div>
            }
            <i className="fa fa-cog editSidebar__settings" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}
