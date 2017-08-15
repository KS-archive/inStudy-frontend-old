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
    };
  }

  componentWillMount() {
    this.getLabels();
  }

  getLabels = () => {
    const labels = this.state.labels;
    this.props.tiles.map((tile) => {
      labels.wszystkie.push(tile._id);
      tile.labels.map((label) => {
        if (!labels[label]) labels[label] = [tile._id];
        else labels[label].push(tile._id);
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

  render() {
    const activeLabelStyle = {
      color: this.props.mainColors[this.props.colors[0]],
      borderBottom: `2px solid ${this.props.mainColors[this.props.colors[0]]}`,
    };
    return (
      <div className="projectsTiles__wrapper">
        <h1 className="body__sectionHeader">{this.props.title}</h1>
        <div className="projectsTiles__container" style={{ textAlign: this.props.textAlign }}>
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
            {
              this.state.labels[this.state.activeLabel].map((id) => {
                let tile = this.props.tiles.filter(el => (el._id === id));
                tile = tile[0];
                return <ProjectsTile {...tile} key={tile._id} mainColors={this.props.mainColors} labelColors={this.props.colors} openDialog={() => { this.openDialog(tile._id); }} />
              })
            }
          </div>
          <ProjectDialog closeDialog={this.closeDialog} open={this.state.dialog} {...this.state.dialogData} />
        </div>
      </div>
    );
  }
}
