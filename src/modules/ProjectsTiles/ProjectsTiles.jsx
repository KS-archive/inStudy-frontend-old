import React, { Component } from 'react';
import ProjectsTile from '../ProjectsTile/ProjectsTile';
import './projectsTiles.scss';

export default class ProjectsTiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: {
        wszystkie: [],
      },
      activeLabel: 'wszystkie',
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
                return <ProjectsTile {...tile} key={tile._id} mainColors={this.props.mainColors} />
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
