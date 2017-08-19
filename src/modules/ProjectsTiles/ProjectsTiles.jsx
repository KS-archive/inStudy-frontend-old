import React, { Component } from 'react';
import ProjectsTile from '../ProjectsTile/ProjectsTile';
import ProjectDialog from '../../dialogs/ProjectDialog/ProjectDialog';
import './projectsTiles.scss';

export default class ProjectsTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: {
        wszystkie: [],
      },
      activeLabel: 'wszystkie',
      dialog: false,
      dialogData: {},
      showAll: false,
    };
  }

  componentWillMount() {
    this.getLabels();
  }

  getLabels = () => {
    const labels = this.state.labels;
    this.props.tiles.map((tile) => {
      const id = tile._id;
      labels.wszystkie.push(id);
      tile.labels.map((label) => {
        if (!labels[label]) labels[label] = [id];
        else labels[label].push(id);
      });
    });
    this.setState({ labels });
  }

  setActiveLabel = (label) => {
    if (this.state.activeLabel !== label) {
      this.setState({ activeLabel: label });
    }
  }

  openDialog = (id) => {
    const dialogData = this.props.tiles.filter(tile => (tile._id === id));
    this.setState({ dialog: true, dialogData: dialogData[0] });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  renderTiles = () => this.state.labels[this.state.activeLabel].map((id, index) => {
    let tile = this.props.tiles.filter(el => (el._id === id));
    tile = tile[0];
    if (index < this.props.rowsLimit * 3 || this.state.showAll || !this.props.rowsLimit) {
      return (<ProjectsTile
        key={tile._id}
        mainColors={this.props.mainColors}
        labelColors={this.props.colors}
        openDialog={() => { this.openDialog(tile._id); }}
        {...tile}
      />);
    }
    return null;
  });

  render() {
    const activeLabelStyle = {
      color: this.props.mainColors[this.props.colors[0]],
      borderBottom: `2px solid ${this.props.mainColors[this.props.colors[0]]}`,
    };
    return (
      <div className="projectsTiles__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="projectsTiles__container">
          <div className="projectsTiles__labels">
            {
              Object.keys(this.state.labels).map(label => (
                <div
                  key={label}
                  className="projectsTiles__label"
                  style={(label === this.state.activeLabel) ? activeLabelStyle : null}
                  onClick={() => { this.setActiveLabel(label); }}
                >{label}</div>),
              )}
          </div>
          <div className="projectsTiles__list">
            {this.renderTiles()}
          </div>
          {(!this.state.showAll && this.props.rowsLimit !== 0) &&
            <div className="projectsTiles__more" onClick={() => { this.setState({ showAll: true }); }}>...</div>
          }
          <ProjectDialog
            closeDialog={this.closeDialog}
            open={this.state.dialog}
            {...this.state.dialogData}
          />
        </div>
      </div>
    );
  }
}
