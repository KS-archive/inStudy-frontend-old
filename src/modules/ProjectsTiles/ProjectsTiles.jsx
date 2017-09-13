import React, { Component } from 'react';
import ProjectsTile from '../ProjectsTile/ProjectsTile';
import ProjectDialog from '../../dialogs/ProjectDialog/ProjectDialog';
import { SectionHeader } from '../../js/globalStyles';
import { Labels, Label, List, More } from './ProjectsTiles_styles';

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

    this.props.content.map((tile) => {
      const id = tile._id;
      labels.wszystkie.push(id);

      tile.labels.map((label) => {
        if (!labels[label]) {
          labels[label] = [id];
        } else {
          labels[label].push(id);
        }
      });
    });

    this.setState({ labels });
  }

  setActiveLabel = (activeLabel) => {
    if (this.state.activeLabel !== activeLabel) {
      this.setState({ activeLabel });
    }
  }

  openDialog = (id) => {
    const dialogData = this.props.content.filter(tile => (tile._id === id));
    this.setState({ dialog: true, dialogData: dialogData[0] });
  }

  closeDialog = () => {
    this.setState({ dialog: false });
  }

  renderTiles = () => {
    const { content, rowsLimit, mainColors, colors } = this.props;
    const { labels, activeLabel, showAll } = this.state;

    return labels[activeLabel].map((id, index) => {
      const tile = content.filter(el => (el._id === id))[0];
      const key = tile._id;
      const openDialog = () => { this.openDialog(key); };
      const attrs = { key, mainColors, openDialog, labelColors: colors, ...tile };

      return (index < rowsLimit * 3 || showAll || !rowsLimit) && <ProjectsTile {...attrs} />;
    });
  }

  renderLabel = (label, color) => {
    const isActive = label === this.props.activeLabel;
    const setActive = () => { this.setActiveLabel(label); };
    return <Label key={label} active={isActive} color={color} onClick={setActive}>{label}</Label>;
  }

  render() {
    const { mainColors, colors, title, rowsLimit } = this.props;
    const { labels, showAll, dialog, dialogData } = this.state;
    const showAllTiles = () => { this.setState({ showAll: true }); };

    return (
      <div>
        <SectionHeader>{title}</SectionHeader>
        <div>
          <Labels>
            {Object.keys(labels).map(label => this.renderLabel(label, mainColors[colors[0]]))}
          </Labels>
          <List>{this.renderTiles()}</List>
          {(!showAll && rowsLimit !== 0) && <More onClick={showAllTiles}>...</More>}
          {(dialog) && <ProjectDialog open closeDialog={this.closeDialog} {...dialogData} />}
        </div>
      </div>
    );
  }
}
